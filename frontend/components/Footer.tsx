// ============================================================================
// FILE: components/Footer.tsx
// Description: Footer component.
// ============================================================================
// This can be a Server Component as it doesn't use client-side hooks.
import React from 'react';
import Link from 'next/link';
import { SunIcon } from '@/components/icons';

const Footer = () => (
  <footer className="bg-gray-800 text-gray-300 py-10 px-6 md:px-10 rounded-t-xl mt-10">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
      {/* About Brighten */}
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <SunIcon className="h-8 w-8 text-orange-500" />
          <h4 className="text-2xl font-bold text-white">Brighten</h4>
        </div>
        <p className="text-sm leading-relaxed">
          Empowering African students with dyslexia through AI-powered educational tools.
        </p>
        <div className="flex space-x-4 mt-4">
          <a href="#" className="text-gray-400 hover:text-white transition duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.136-1.333h2.864v-5h-3.972c-3.122 0-4.728 1.865-4.728 4.667v2.333z"/></svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.594 0-6.494 2.902-6.494 6.494 0 .509.058 1.007.173 1.487-5.405-.271-10.196-2.868-13.404-6.817-.559.954-.881 2.072-.881 3.292 0 2.254 1.14 4.248 2.873 5.424-.847-.026-1.649-.26-2.35-.647-.029.761.248 1.479.794 2.05-.756.193-1.479.317-2.13.364.692 1.815 2.844 3.15 5.275 3.471-1.077.294-2.219.452-3.402.452-.264 0-.524-.023-.779-.067 1.378 4.301 5.399 7.425 10.165 7.425 12.13 0 18.781-10.038 18.781-18.781 0-.357-.012-.71-.031-1.056.911-.654 1.7-1.477 2.323-2.41Z"/></svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.07 1.645.07 4.85s-.012 3.584-.07 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.251-.149-4.771-1.699-4.919-4.919-.058-1.265-.07-1.644-.07-4.85s.012-3.583.07-4.85c.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.073 4.948.073s3.668-.014 4.948-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.44-.645 1.44-1.44s-.645-1.44-1.44-1.44z"/></svg>
          </a>
        </div>
      </div>

      {/* Quick Links */}
      <div>
        <h4 className="text-xl font-bold text-white mb-4">Quick Links</h4>
        <ul className="space-y-2">
          <li><Link href="/" passHref><button className="text-gray-300 hover:text-orange-500 transition duration-200 text-sm">Home</button></Link></li>
          <li><Link href="/curriculum" passHref><button className="text-gray-300 hover:text-orange-500 transition duration-200 text-sm">Curriculum</button></Link></li>
          <li><Link href="/upload" passHref><button className="text-gray-300 hover:text-orange-500 transition duration-200 text-sm">Upload & Simplify</button></Link></li>
          <li><Link href="/visualizations" passHref><button className="text-gray-300 hover:text-orange-500 transition duration-200 text-sm">Visualizations</button></Link></li>
          <li><Link href="/settings" passHref><button className="text-gray-300 hover:text-orange-500 transition duration-200 text-sm">Settings</button></Link></li>
        </ul>
      </div>

      {/* Resources */}
      <div>
        <h4 className="text-xl font-bold text-white mb-4">Resources</h4>
        <ul className="space-y-2">
          <li><a href="#" className="text-gray-300 hover:text-orange-500 transition duration-200 text-sm">Help Center</a></li>
          <li><a href="#" className="text-gray-300 hover:text-orange-500 transition duration-200 text-sm">Dyslexia Support</a></li>
          <li><a href="#" className="text-gray-300 hover:text-orange-500 transition duration-200 text-sm">Teacher Resources</a></li>
          <li><a href="#" className="text-gray-300 hover:text-orange-500 transition duration-200 text-sm">Parent Guide</a></li>
        </ul>
      </div>

      {/* Contact Us */}
      <div>
        <h4 className="text-xl font-bold text-white mb-4">Contact Us</h4>
        <ul className="space-y-2">
          <li className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <a href="mailto:support@brighten.edu" className="text-gray-300 hover:text-orange-500 transition duration-200 text-sm">support@brighten.edu</a>
          </li>
          <li className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.134l-1.498.999a1 1 0 00-.472 1.295l.02.02a1 1 0 00.315.606l1.498 1.498a1 1 0 001.295.472l.999-1.498a1 1 0 011.134-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <a href="tel:+254123456789" className="text-gray-300 hover:text-orange-500 transition duration-200 text-sm">+254 123 456 789</a>
          </li>
        </ul>
      </div>
    </div>
    <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-500 text-sm">
      &copy; 2023 Brighten. All rights reserved. Designed with ❤️ for African students.
    </div>
  </footer>
);

export default Footer;