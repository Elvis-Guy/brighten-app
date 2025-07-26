"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import AdminRoute from '@/components/AdminRoute';
import type { CurriculumGrade, CurriculumSubjectAdmin } from '@/types';

const NewTopicPage: React.FC = () => {
  const router = useRouter();
  const { getAllGrades, getAllSubjects, createTopic, checkAdminPermission } = useAppContext();
  
  const [grades, setGrades] = useState<CurriculumGrade[]>([]);
  const [subjects, setSubjects] = useState<CurriculumSubjectAdmin[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    subjectId: '',
    order: 1,
    difficulty: 'beginner' as 'beginner' | 'intermediate' | 'advanced',
    estimatedTime: 30,
    isActive: true
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [gradesData, subjectsData] = await Promise.all([
        getAllGrades(),
        getAllSubjects()
      ]);
      setGrades(gradesData);
      setSubjects(subjectsData);
    } catch (err) {
      console.error('Error loading data:', err);
      setError('Failed to load form data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!checkAdminPermission('canCreateTopics')) {
      setError('You do not have permission to create topics');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      
      // Get the subject to find the gradeId
      const subject = subjects.find(s => s.id === formData.subjectId);
      if (!subject) {
        setError('Please select a valid subject');
        return;
      }

      const topicData = {
        ...formData,
        gradeId: subject.gradeId,
        estimatedDuration: formData.estimatedTime, // Map estimatedTime to estimatedDuration
        learningObjectives: [], // Default empty array
        keywords: [] // Default empty array
      };
      
      await createTopic(topicData);
      
      setSuccess(true);
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        content: '',
        subjectId: '',
        order: 1,
        difficulty: 'beginner',
        estimatedTime: 30,
        isActive: true
      });

      // Redirect after success
      setTimeout(() => {
        router.push('/admin/topics');
      }, 2000);
      
    } catch (error) {
      console.error('Error creating topic:', error);
      setError('Failed to create topic. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (name === 'order' || name === 'estimatedTime') {
      setFormData(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const getGradeName = (subjectId: string) => {
    const subject = subjects.find(s => s.id === subjectId);
    if (!subject) return 'Unknown';
    const grade = grades.find(g => g.id === subject.gradeId);
    return grade ? grade.name : 'Unknown Grade';
  };

  if (loading) {
    return (
      <AdminRoute>
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
            <span className="text-gray-700">Loading...</span>
          </div>
        </div>
      </AdminRoute>
    );
  }

  return (
    <AdminRoute>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-3">
                  <Link href="/admin/topics" className="text-purple-500 hover:text-purple-600">
                    ← Back to Topics
                  </Link>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mt-2">Create New Topic</h1>
                <p className="text-gray-600 mt-1">Add a new learning topic to the curriculum</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-8">
          {/* Success Message */}
          {success && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-green-800 font-medium">Topic created successfully!</p>
                  <p className="text-green-700 text-sm">Redirecting to topics list...</p>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          {/* Form */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Topic Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900"
                    placeholder="e.g., Linear Equations, Photosynthesis, Romeo and Juliet"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    name="subjectId"
                    value={formData.subjectId}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900"
                    required
                  >
                    <option value="">Select a subject</option>
                    {subjects.filter(subject => subject.isActive).map((subject) => (
                      <option key={subject.id} value={subject.id}>
                        {subject.name} ({getGradeName(subject.id)})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Order in Subject
                  </label>
                  <input
                    type="number"
                    name="order"
                    value={formData.order}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900"
                    min="1"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">Determines the sequence of topics</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Difficulty Level
                  </label>
                  <select
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estimated Time (minutes)
                  </label>
                  <input
                    type="number"
                    name="estimatedTime"
                    value={formData.estimatedTime}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900"
                    min="5"
                    max="180"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">How long students should spend learning this topic</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Short Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900"
                  placeholder="Brief overview of what this topic covers and what students will learn..."
                />
                <p className="text-xs text-gray-500 mt-1">This will be shown as a preview to students</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content *
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  rows={12}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900 font-mono text-sm"
                  placeholder="Write the full content for this topic. This will be the main learning material for students.

You can use multiple paragraphs, and the content will be automatically formatted for display.

Example content:
Linear equations are mathematical expressions that represent a straight line when graphed. They have the general form y = mx + b, where:
- m is the slope of the line
- b is the y-intercept

Understanding linear equations is fundamental to algebra and helps students develop problem-solving skills..."
                  required
                />
                <p className="text-xs text-gray-500 mt-1">This is the main learning content that students will read and interact with</p>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isActive"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <label htmlFor="isActive" className="ml-3 block text-sm text-gray-700">
                  <span className="font-medium">Active</span>
                  <span className="text-gray-500 block">Topic is visible to students and can be accessed</span>
                </label>
              </div>

              <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
                <Link
                  href="/admin/topics"
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {submitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Creating...
                    </>
                  ) : (
                    'Create Topic'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AdminRoute>
  );
};

export default NewTopicPage; 