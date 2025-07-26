"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAppContext } from '@/context/AppContext';
import AdminRoute from '@/components/AdminRoute';
import type { CurriculumTopicAdmin, CurriculumSubjectAdmin, CurriculumGrade } from '@/types';

const TopicsAdminPage: React.FC = () => {
  const { getAllTopics, getAllSubjects, getAllGrades, createTopic, updateTopic, deleteTopic, checkAdminPermission } = useAppContext();
  
  const [topics, setTopics] = useState<CurriculumTopicAdmin[]>([]);
  const [subjects, setSubjects] = useState<CurriculumSubjectAdmin[]>([]);
  const [grades, setGrades] = useState<CurriculumGrade[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingTopic, setEditingTopic] = useState<CurriculumTopicAdmin | null>(null);
  
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
      const [topicsData, subjectsData, gradesData] = await Promise.all([
        getAllTopics(),
        getAllSubjects(),
        getAllGrades()
      ]);
      setTopics(topicsData);
      setSubjects(subjectsData);
      setGrades(gradesData);
    } catch (err) {
      console.error('Error loading data:', err);
      setError('Failed to load topics');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
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

      if (editingTopic) {
        // Update existing topic
        await updateTopic(editingTopic.id, topicData);
      } else {
        // Create new topic
        await createTopic(topicData);
      }
      
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
      setShowCreateForm(false);
      setEditingTopic(null);
      
      // Reload topics
      await loadData();
    } catch (error) {
      console.error('Error saving topic:', error);
      setError('Failed to save topic');
    }
  };

  const handleEdit = (topic: CurriculumTopicAdmin) => {
    setEditingTopic(topic);
    setFormData({
      title: topic.title,
      description: topic.description || '',
      content: topic.content || '',
      subjectId: topic.subjectId,
      order: topic.order,
      difficulty: topic.difficulty,
      estimatedTime: topic.estimatedTime,
      isActive: topic.isActive
    });
    setShowCreateForm(true);
  };

  const handleDelete = async (topicId: string) => {
    if (confirm('Are you sure you want to delete this topic?')) {
      try {
        await deleteTopic(topicId);
        await loadData();
      } catch (error) {
        console.error('Error deleting topic:', error);
        setError('Failed to delete topic');
      }
    }
  };

  const resetForm = () => {
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
    setShowCreateForm(false);
    setEditingTopic(null);
  };

  const getSubjectName = (subjectId: string) => {
    const subject = subjects.find(s => s.id === subjectId);
    return subject ? subject.name : 'Unknown Subject';
  };

  const getGradeName = (subjectId: string) => {
    const subject = subjects.find(s => s.id === subjectId);
    if (!subject) return 'Unknown';
    const grade = grades.find(g => g.id === subject.gradeId);
    return grade ? grade.name : 'Unknown Grade';
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <AdminRoute>
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
            <span className="text-gray-700">Loading topics...</span>
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
                  <Link href="/admin" className="text-blue-500 hover:text-blue-600">
                    ← Back to Dashboard
                  </Link>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mt-2">Topics Management</h1>
                <p className="text-gray-600 mt-1">Manage curriculum topics and their content</p>
              </div>
              {checkAdminPermission('canCreateTopics') && (
                <div className="flex space-x-3">
                  <Link 
                    href="/admin/topics/new"
                    className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                  >
                    + Create New Topic
                  </Link>
                  <button
                    onClick={() => setShowCreateForm(true)}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    + Quick Add
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          {/* Create/Edit Form */}
          {showCreateForm && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {editingTopic ? 'Edit Topic' : 'Create New Topic'}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Topic Title
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="e.g., Linear Equations, Photosynthesis"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <select
                      value={formData.subjectId}
                      onChange={(e) => setFormData({ ...formData, subjectId: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      required
                    >
                      <option value="">Select a subject</option>
                      {subjects.map((subject) => (
                        <option key={subject.id} value={subject.id}>
                          {subject.name} ({getGradeName(subject.id)})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Order
                    </label>
                    <input
                      type="number"
                      value={formData.order}
                      onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      min="1"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Difficulty
                    </label>
                    <select
                      value={formData.difficulty}
                      onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as 'beginner' | 'intermediate' | 'advanced' })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Estimated Time (minutes)
                    </label>
                    <input
                      type="number"
                      value={formData.estimatedTime}
                      onChange={(e) => setFormData({ ...formData, estimatedTime: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      min="5"
                      max="180"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    rows={3}
                    placeholder="Brief description of this topic..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Content
                  </label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    rows={6}
                    placeholder="Main content for this topic..."
                    required
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">
                    Active (visible to students)
                  </label>
                </div>
                <div className="flex space-x-3">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                  >
                    {editingTopic ? 'Update Topic' : 'Create Topic'}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Topics List */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">All Topics ({topics.length})</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Topic
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subject
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Difficulty
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {topics.map((topic) => (
                    <tr key={topic.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{topic.title}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">
                          {topic.description || 'No description'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{getSubjectName(topic.subjectId)}</div>
                        <div className="text-sm text-gray-500">{getGradeName(topic.subjectId)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{topic.order}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getDifficultyColor(topic.difficulty)}`}>
                          {topic.difficulty}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{topic.estimatedTime}min</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          topic.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {topic.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          {checkAdminPermission('canEditTopics') && (
                            <button
                              onClick={() => handleEdit(topic)}
                              className="text-purple-600 hover:text-purple-900"
                            >
                              Edit
                            </button>
                          )}
                          {checkAdminPermission('canDeleteTopics') && (
                            <button
                              onClick={() => handleDelete(topic.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {topics.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">No topics found. Create your first topic to get started.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminRoute>
  );
};

export default TopicsAdminPage; 