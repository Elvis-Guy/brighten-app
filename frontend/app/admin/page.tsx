// ============================================================================
// FILE: app/admin/page.tsx
// Description: Main admin dashboard page for curriculum management.
// ============================================================================
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAppContext } from '@/context/AppContext';
import AdminRoute from '@/components/AdminRoute';
import type { CurriculumGrade, CurriculumSubjectAdmin, CurriculumTopicAdmin } from '@/types';

const AdminDashboard: React.FC = () => {
  const { authState, getAllGrades, getAllSubjects, getAllTopics, checkAdminPermission } = useAppContext();
  
  const [grades, setGrades] = useState<CurriculumGrade[]>([]);
  const [subjects, setSubjects] = useState<CurriculumSubjectAdmin[]>([]);
  const [topics, setTopics] = useState<CurriculumTopicAdmin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        const [gradesData, subjectsData, topicsData] = await Promise.all([
          getAllGrades(),
          getAllSubjects(),
          getAllTopics()
        ]);
        
        setGrades(gradesData);
        setSubjects(subjectsData);
        setTopics(topicsData);
      } catch (err) {
        console.error('Error loading dashboard data:', err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [getAllGrades, getAllSubjects, getAllTopics]);

  if (loading) {
    return (
      <AdminRoute>
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
            <span className="text-gray-700">Loading dashboard...</span>
          </div>
        </div>
      </AdminRoute>
    );
  }

  if (error) {
    return (
      <AdminRoute>
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </AdminRoute>
    );
  }

  const dashboardStats = [
    {
      title: 'Total Grades',
      value: grades.length,
      color: 'bg-blue-500',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      link: '/admin/grades'
    },
    {
      title: 'Total Subjects',
      value: subjects.length,
      color: 'bg-green-500',
      textColor: 'text-green-600',
      bgColor: 'bg-green-50',
      link: '/admin/subjects'
    },
    {
      title: 'Total Topics',
      value: topics.length,
      color: 'bg-purple-500',
      textColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
      link: '/admin/topics'
    },
    {
      title: 'Active Grades',
      value: grades.filter(g => g.isActive).length,
      color: 'bg-orange-500',
      textColor: 'text-orange-600',
      bgColor: 'bg-orange-50',
      link: '/admin/grades'
    }
  ];

  return (
    <AdminRoute>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-gray-600 mt-1">
                  Welcome back, {authState.user?.displayName || 'Administrator'}
                </p>
              </div>
              <div className="flex space-x-3">
                {checkAdminPermission('canCreateGrades') && (
                  <Link href="/admin/grades/new">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                      + New Grade
                    </button>
                  </Link>
                )}
                {checkAdminPermission('canCreateSubjects') && (
                  <Link href="/admin/subjects/new">
                    <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                      + New Subject
                    </button>
                  </Link>
                )}
                {checkAdminPermission('canCreateTopics') && (
                  <Link href="/admin/topics/new">
                    <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
                      + New Topic
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {dashboardStats.map((stat, index) => (
              <Link href={stat.link} key={index}>
                <div className={`${stat.bgColor} rounded-xl p-6 hover:shadow-lg transition-all duration-200 cursor-pointer border border-gray-200`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                      <p className={`text-3xl font-bold ${stat.textColor} mt-1`}>{stat.value}</p>
                    </div>
                    <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Grades */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Recent Grades</h3>
                <Link href="/admin/grades" className="text-blue-500 hover:text-blue-600 text-sm font-medium">
                  View All →
                </Link>
              </div>
              <div className="p-6">
                {grades.slice(0, 5).map((grade) => (
                  <div key={grade.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                    <div>
                      <p className="font-medium text-gray-900">{grade.name}</p>
                      <p className="text-sm text-gray-500">Grade {grade.gradeNumber}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      grade.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {grade.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                ))}
                {grades.length === 0 && (
                  <p className="text-gray-500 text-center py-4">No grades created yet</p>
                )}
              </div>
            </div>

            {/* Recent Subjects */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Recent Subjects</h3>
                <Link href="/admin/subjects" className="text-green-500 hover:text-green-600 text-sm font-medium">
                  View All →
                </Link>
              </div>
              <div className="p-6">
                {subjects.slice(0, 5).map((subject) => (
                  <div key={subject.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                    <div>
                      <p className="font-medium text-gray-900">{subject.name}</p>
                      <p className="text-sm text-gray-500">{subject.totalTopics} topics</p>
                    </div>
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      {subject.code}
                    </span>
                  </div>
                ))}
                {subjects.length === 0 && (
                  <p className="text-gray-500 text-center py-4">No subjects created yet</p>
                )}
              </div>
            </div>

            {/* Recent Topics */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Recent Topics</h3>
                <Link href="/admin/topics" className="text-purple-500 hover:text-purple-600 text-sm font-medium">
                  View All →
                </Link>
              </div>
              <div className="p-6">
                {topics.slice(0, 5).map((topic) => (
                  <div key={topic.id} className="py-3 border-b border-gray-100 last:border-b-0">
                    <p className="font-medium text-gray-900 truncate">{topic.title}</p>
                    <p className="text-sm text-gray-500">
                      Order: {topic.order} • {topic.difficulty}
                    </p>
                  </div>
                ))}
                {topics.length === 0 && (
                  <p className="text-gray-500 text-center py-4">No topics created yet</p>
                )}
              </div>
            </div>
          </div>

          {/* Admin Actions */}
          <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/admin/grades">
                <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <span className="font-medium text-gray-900">Manage Grades</span>
                  </div>
                </div>
              </Link>

              <Link href="/admin/subjects">
                <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <span className="font-medium text-gray-900">Manage Subjects</span>
                  </div>
                </div>
              </Link>

              <Link href="/admin/topics">
                <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <span className="font-medium text-gray-900">Manage Topics</span>
                  </div>
                </div>
              </Link>

              <Link href="/">
                <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </div>
                    <span className="font-medium text-gray-900">Back to App</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AdminRoute>
  );
};

export default AdminDashboard; 