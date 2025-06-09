// ============================================================================
// FILE: app/upload/page.tsx
// Description: Page for uploading and simplifying user documents.
// ============================================================================
"use client";

import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import { UploadIcon, DocumentIcon, PDFIcon, WordIcon, ArrowRightIcon } from '@/components/icons';
import PasteTextModal from '@/components/ui/PasteTextModal';
import type { CurriculumSubject } from '@/types';

interface UploadedFile {
  name: string;
  uploaded: string;
  type: 'pdf' | 'word' | 'text';
}

const UploadSimplifyPage: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { setSelectedLesson, showPasteTextModal, setShowPasteTextModal, pasteTextContent, setPasteTextContent } = useAppContext();
  const router = useRouter();

  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([
    { name: "History_Assignment.pdf", uploaded: "2 days ago", type: "pdf" },
    { name: "Geography_Notes.docx", uploaded: "1 week ago", type: "word" },
  ]);

  const handleChooseFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const textContent = e.target?.result as string;
        const fileType = file.name.endsWith('.pdf') ? 'pdf' : (file.name.endsWith('.docx') || file.name.endsWith('.doc') ? 'word' : 'text');

        const newLesson: CurriculumSubject = {
          id: `uploaded-${Date.now()}`, // Unique ID for uploaded content
          title: file.name.split('.')[0],
          lessons: 1,
          progress: 0,
          topic: "Uploaded Document",
          description: "Your uploaded content.",
          image: `https://placehold.co/400x200/CCCCCC/333333?text=Uploaded+${fileType.toUpperCase()}`, // Placeholder image
          content: {
            original: textContent,
            simplified: "Click 'Simplify Text' to see the simplified version.",
            visualPrompt: `An illustration related to the content of "${file.name.split('.')[0]}"`
          }
        };
        setSelectedLesson(newLesson);
        router.push(`/content/${newLesson.id}`);
        console.warn(`File "${file.name}" uploaded. You can now simplify or visualize it.`);
      };
      reader.readAsText(file);
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
          visualPrompt: `An illustration related to the pasted text.`
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
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Upload Your Own Text</h2>

      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 text-center mb-10">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-10 flex flex-col items-center justify-center">
          <UploadIcon className="h-16 w-16 text-gray-400 mb-4" />
          <p className="text-xl font-semibold text-gray-700 mb-2">Drag & Drop Your File</p>
          <p className="text-gray-500 mb-6">Upload PDF, Word documents, or text files to simplify and visualize</p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden"
              accept=".pdf,.txt,.doc,.docx"
            />
            <button
              onClick={handleChooseFileClick}
              className="px-8 py-4 bg-orange-500 text-white font-bold rounded-full shadow-md hover:bg-orange-600 transition duration-300 text-lg flex items-center justify-center"
            >
              <DocumentIcon className="h-6 w-6 mr-2" /> Choose File
            </button>
            <button
              onClick={() => setShowPasteTextModal(true)}
              className="px-8 py-4 border-2 border-orange-500 text-orange-500 font-bold rounded-full shadow-md hover:bg-orange-50 transition duration-300 text-lg flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg> Paste Text
            </button>
          </div>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-gray-800 mb-6">Recently Uploaded</h3>
      <div className="bg-white rounded-xl shadow-lg border border-gray-200">
        {uploadedFiles.map((file, index) => (
          <div key={index} className="flex items-center justify-between p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition duration-200 cursor-pointer">
            <div className="flex items-center space-x-4">
              {file.type === 'pdf' ? <PDFIcon /> : <WordIcon />}
              <div>
                <p className="text-lg font-semibold text-gray-800">{file.name}</p>
                <p className="text-sm text-gray-500">Uploaded {file.uploaded}</p>
              </div>
            </div>
            <ArrowRightIcon className="text-gray-400" />
          </div>
        ))}
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