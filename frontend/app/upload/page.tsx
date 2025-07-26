// ============================================================================
// FILE: app/upload/page.tsx
// Description: Page for uploading and simplifying user documents.
// ============================================================================
"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import { CloudUploadIcon, DocumentIcon } from '@/components/icons';
import PasteTextModal from '@/components/ui/PasteTextModal';
import type { CurriculumSubject } from '@/types';
import * as pdfjs from 'pdfjs-dist';

const UploadSimplifyPage: React.FC = () => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const { setSelectedLesson, showPasteTextModal, setShowPasteTextModal, pasteTextContent, setPasteTextContent } = useAppContext();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [processStatus, setProcessStatus] = React.useState('');

  // Set up PDF.js worker
  React.useEffect(() => {
    // Use the same version as installed in package.json (5.3.93)
    pdfjs.GlobalWorkerOptions.workerSrc = 'https://unpkg.com/pdfjs-dist@5.3.93/build/pdf.worker.min.mjs';
    console.log('PDF.js worker initialized with version:', pdfjs.version);
  }, []);

  const handleChooseFileClick = () => {
    fileInputRef.current?.click();
  };

  const extractTextFromPDF = async (file: File): Promise<string> => {
    try {
      console.log('Starting PDF extraction for file:', file.name, 'Size:', file.size);
      
      const arrayBuffer = await file.arrayBuffer();
      console.log('ArrayBuffer created, size:', arrayBuffer.byteLength);
      
      const loadingTask = pdfjs.getDocument({
        data: arrayBuffer,
        cMapUrl: 'https://unpkg.com/pdfjs-dist@5.3.93/cmaps/',
        cMapPacked: true,
      });
      
      const pdf = await loadingTask.promise;
      console.log('PDF loaded successfully, pages:', pdf.numPages);
      
      let fullText = '';
      
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        try {
          console.log(`Processing page ${pageNum}/${pdf.numPages}`);
          const page = await pdf.getPage(pageNum);
          const textContent = await page.getTextContent();
          
          const pageText = textContent.items
            .filter((item: unknown) => typeof item === 'object' && item !== null && 'str' in item && (item as {str: string}).str && (item as {str: string}).str.trim())
            .map((item: unknown) => (item as {str: string}).str.trim())
            .join(' ');
          
          if (pageText.trim()) {
            fullText += pageText + '\n\n';
            console.log(`Page ${pageNum} extracted ${pageText.length} characters`);
          } else {
            console.log(`Page ${pageNum} has no text content (might be image-based)`);
          }
        } catch (pageError) {
          console.warn(`Error processing page ${pageNum}:`, pageError);
          // Continue with other pages
        }
      }
      
      const finalText = fullText.trim();
      console.log('Total extracted text length:', finalText.length);
      
      if (!finalText) {
        throw new Error('NO_TEXT_FOUND');
      }
      
      return finalText;
    } catch (error) {
      console.error('Error extracting text from PDF:', error);
      
      if (error instanceof Error) {
        if (error.message === 'NO_TEXT_FOUND') {
          throw new Error('This PDF appears to be image-based or has no extractable text. Please try a text-based PDF or use the &quot;Paste Text&quot; option instead.');
        } else if (error.message.includes('Invalid PDF')) {
          throw new Error('Invalid PDF file. Please make sure the file is a valid PDF document.');
        } else if (error.message.includes('password')) {
          throw new Error('This PDF is password-protected. Please use an unprotected PDF file.');
        }
      }
      
      throw new Error('Unable to process this PDF file. Please try a different PDF or use the &quot;Paste Text&quot; option instead.');
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setProcessStatus('Processing file...');

    try {
      const fileName = file.name;
      const fileExtension = fileName.split('.').pop()?.toLowerCase();
      let textContent = '';
      let fileType = 'text';

      if (fileExtension === 'pdf') {
        fileType = 'pdf';
        setProcessStatus('Extracting text from PDF...');
        try {
          textContent = await extractTextFromPDF(file);
        } catch (pdfError) {
          // If PDF extraction fails, offer to try as text (fallback for simple PDFs)
          console.log('PDF extraction failed, offering text fallback...');
          throw pdfError; // Let the main error handler deal with it
        }
      } else if (fileExtension === 'txt') {
        fileType = 'text';
        setProcessStatus('Reading text file...');
        textContent = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.readAsText(file);
        });
      } else if (fileExtension === 'doc' || fileExtension === 'docx') {
        fileType = 'word';
        setProcessStatus('Reading Word document...');
        // For now, treat as text - you could add proper Word parsing later
        textContent = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.readAsText(file);
        });
      } else {
        throw new Error('Unsupported file type. Please upload PDF, TXT, DOC, or DOCX files.');
      }

      if (!textContent.trim()) {
        throw new Error('No text content found in the file.');
      }

      setProcessStatus('Creating lesson...');
      const newLesson: CurriculumSubject = {
        id: `uploaded-${Date.now()}`,
        title: fileName.split('.')[0],
        lessons: 1,
        progress: 0,
        topic: "Uploaded Document",
        description: `Uploaded ${fileType.toUpperCase()} file`,
        image: `https://placehold.co/400x200/CCCCCC/333333?text=Uploaded+${fileType.toUpperCase()}`,
        content: {
          original: textContent,
          simplified: "",
          visualPrompt: `${fileName.split('.')[0]} diagram`
        }
      };

      setSelectedLesson(newLesson);
      router.push(`/content/${newLesson.id}`);
      
    } catch (error) {
      console.error('Error processing file:', error);
      setProcessStatus('');
      
      const errorMessage = error instanceof Error ? error.message : 'Error processing file. Please try again.';
      
      // Show error with option to paste text instead
      const userWantsToTryAgain = confirm(
        `${errorMessage}\n\nWould you like to paste the text content manually instead? Click OK to open the text input, or Cancel to try a different file.`
      );
      
      if (userWantsToTryAgain) {
        setShowPasteTextModal(true);
      }
    } finally {
      setIsProcessing(false);
      setProcessStatus('');
    }
  };

  const handlePasteText = async () => {
    if (pasteTextContent.trim()) {
      const newLesson: CurriculumSubject = {
        id: `pasted-${Date.now()}`, // Unique ID for pasted content
        title: "Pasted Content",
        lessons: 1,
        progress: 0,
        topic: "Pasted Text",
        description: "Your pasted content.",
        image: "https://placehold.co/400x200/CCCCCC/333333?text=Pasted+Text",
        content: {
          original: pasteTextContent,
          simplified: "Click 'Simplify Text' to see the simplified version.",
          visualPrompt: `pasted content diagram`
        }
      };
      setSelectedLesson(newLesson);
      router.push(`/content/${newLesson.id}`);
      setShowPasteTextModal(false);
      setPasteTextContent('');
      console.warn("Text pasted. You can now simplify or visualize it.");
    } else {
      console.warn("Please paste some text.");
    }
  };

  return (
    <div className="p-6 md:p-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Upload Your Own Content</h2>

      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 text-center mb-10">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-10 flex flex-col items-center justify-center">
          <CloudUploadIcon className="h-16 w-16 text-gray-400 mb-4" />
          <p className="text-xl font-semibold text-gray-700 mb-2">
            {isProcessing ? 'Processing...' : 'Upload Your Document'}
          </p>
          <p className="text-gray-500 mb-6">
            {isProcessing ? processStatus : 'Upload PDF, TXT, DOC, or DOCX files to simplify and visualize'}
          </p>
          
          {isProcessing && (
            <div className="flex items-center justify-center mb-6">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden"
              accept=".pdf,.txt,.doc,.docx"
              disabled={isProcessing}
            />
            <button
              onClick={handleChooseFileClick}
              disabled={isProcessing}
              className={`px-8 py-4 font-bold rounded-full shadow-md transition duration-300 text-lg flex items-center justify-center ${
                isProcessing 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-orange-500 text-white hover:bg-orange-600'
              }`}
            >
              <DocumentIcon className="h-6 w-6 mr-2" />
              {isProcessing ? 'Processing...' : 'Choose File'}
            </button>
            <button
              onClick={() => setShowPasteTextModal(true)}
              disabled={isProcessing}
              className={`px-8 py-4 border-2 font-bold rounded-full shadow-md transition duration-300 text-lg flex items-center justify-center ${
                isProcessing 
                  ? 'border-gray-300 text-gray-400 cursor-not-allowed' 
                  : 'border-orange-500 text-orange-500 hover:bg-orange-50'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Paste Text
            </button>
          </div>
        </div>
      </div>

      {/* Supported File Types */}
      <div className="bg-blue-50 rounded-xl p-6 border border-blue-200 mb-8">
        <h3 className="text-lg font-semibold text-blue-800 mb-3">📄 Supported File Types</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-gray-700">PDF Documents</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-gray-700">Word Documents (.doc, .docx)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-700">Text Files (.txt)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <span className="text-gray-700">Pasted Text</span>
          </div>
        </div>
        
        {/* PDF Troubleshooting */}
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-xs text-yellow-800">
            <strong>💡 PDF Troubleshooting:</strong> If PDF upload fails, the file might be image-based or protected. 
            Use the &quot;Paste Text&quot; option to manually input the content instead.
          </p>
        </div>
      </div>

      <PasteTextModal
        show={showPasteTextModal}
        onClose={() => setShowPasteTextModal(false)}
        onPaste={handlePasteText}
        text={pasteTextContent}
        setText={setPasteTextContent}
      />
    </div>
  );
};

export default UploadSimplifyPage;