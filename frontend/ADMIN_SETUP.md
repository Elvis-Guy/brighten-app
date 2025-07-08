# Admin System Setup Guide

## 🔐 **Setting Up Your First Admin Account**

The Brighten admin system allows you to manage curriculum content including grades, subjects, and topics. Here's how to set up your first admin account:

### **Step 1: Create a Regular Account**
1. Sign up for a regular account using the `/auth/signup` page
2. Use your email and create a strong password
3. Complete the signup process

### **Step 2: Promote Account to Admin**

Since you need an admin account to access the admin panel, you'll need to manually promote your first account using Firebase Console:

#### **Using Firebase Console (Recommended):**
1. Go to your [Firebase Console](https://console.firebase.google.com/)
2. Select your Brighten project
3. Navigate to **Firestore Database**
4. Find the `users` collection
5. Locate your user document (using your user ID)
6. Edit the document and add these fields:
   ```
   role: "admin"  (or "super_admin" for full permissions)
   ```
7. Save the changes

#### **Using Firebase Admin SDK (For Developers):**
If you have access to the backend, you can run this script:

```javascript
// Add this to a one-time setup script
const admin = require('firebase-admin');

async function promoteToAdmin(userEmail) {
  const userRecord = await admin.auth().getUserByEmail(userEmail);
  
  await admin.firestore().collection('users').doc(userRecord.uid).set({
    role: 'admin', // or 'super_admin'
    email: userEmail,
    displayName: userRecord.displayName,
    createdAt: new Date().toISOString(),
    permissions: {
      // Custom permissions if needed
    }
  }, { merge: true });
  
  console.log(`User ${userEmail} promoted to admin`);
}

// Replace with your email
promoteToAdmin('your-email@example.com');
```

### **Step 3: Access Admin Dashboard**
1. Sign in with your promoted account
2. You should now see an "Admin" link in the navigation
3. Visit `/admin` to access the admin dashboard

---

## 🎯 **Admin Roles & Permissions**

### **Role Types:**
- **`student`**: Regular user (default)
- **`admin`**: Can manage curriculum content
- **`super_admin`**: Full administrative access

### **Permission Matrix:**
| Permission | Admin | Super Admin |
|------------|-------|-------------|
| Create Grades | ❌ | ✅ |
| Edit Grades | ✅ | ✅ |
| Delete Grades | ❌ | ✅ |
| Create Subjects | ✅ | ✅ |
| Edit Subjects | ✅ | ✅ |
| Delete Subjects | ✅ | ✅ |
| Create Topics | ✅ | ✅ |
| Edit Topics | ✅ | ✅ |
| Delete Topics | ✅ | ✅ |
| View Analytics | ✅ | ✅ |
| Manage Users | ❌ | ✅ |

---

## 📚 **Managing Curriculum Content**

### **Creating Grades**
1. Go to `/admin/grades` or click "Manage Grades" from dashboard
2. Click "+ New Grade" button
3. Fill in:
   - **Grade Number**: Numeric value (e.g., 10, 11, 12)
   - **Name**: Display name (e.g., "Grade 10", "Form 1")
   - **Description**: Optional description
   - **Active Status**: Whether the grade is currently available

### **Creating Subjects**
1. Go to `/admin/subjects` or click "Manage Subjects"
2. Click "+ New Subject"
3. Fill in:
   - **Name**: Subject name (e.g., "Mathematics", "Science")
   - **Code**: Short code (e.g., "MATH", "SCI")
   - **Grade**: Select which grade this subject belongs to
   - **Description**: Optional description

### **Creating Topics/Lessons**
1. Go to `/admin/topics` or click "Manage Topics"
2. Click "+ New Topic"
3. Fill in:
   - **Title**: Topic/lesson title
   - **Content**: Full lesson content (supports markdown)
   - **Subject**: Which subject this topic belongs to
   - **Order**: Position within the subject (for sequencing)
   - **Difficulty**: Beginner, Intermediate, or Advanced
   - **Duration**: Estimated time in minutes
   - **Learning Objectives**: Key goals for this topic
   - **Keywords**: Tags for searchability

---

## 🔄 **Database Structure**

The admin system uses these Firestore collections:

### **`curriculum_grades`**
```
{
  id: "auto-generated",
  gradeNumber: 10,
  name: "Grade 10",
  description: "Secondary school grade 10",
  isActive: true,
  createdAt: "2025-01-01T00:00:00Z",
  updatedAt: "2025-01-01T00:00:00Z",
  createdBy: "admin-user-id"
}
```

### **`curriculum_subjects`**
```
{
  id: "auto-generated",
  name: "Mathematics",
  code: "MATH",
  description: "Core mathematics curriculum",
  gradeId: "grade-document-id",
  isActive: true,
  totalTopics: 15,
  createdAt: "2025-01-01T00:00:00Z",
  updatedAt: "2025-01-01T00:00:00Z",
  createdBy: "admin-user-id"
}
```

### **`curriculum_topics`**
```
{
  id: "auto-generated",
  title: "Linear Equations",
  content: "Full lesson content here...",
  subjectId: "subject-document-id",
  gradeId: "grade-document-id",
  order: 1,
  difficulty: "intermediate",
  estimatedDuration: 45,
  learningObjectives: ["Solve linear equations", "Graph linear functions"],
  keywords: ["algebra", "equations", "graphs"],
  isActive: true,
  createdAt: "2025-01-01T00:00:00Z",
  updatedAt: "2025-01-01T00:00:00Z",
  createdBy: "admin-user-id"
}
```

---

## 🛡️ **Security Features**

- **Role-based access control**: Only admins can access admin routes
- **Permission checking**: Granular permissions for different actions
- **Audit trails**: All content creation/modification is tracked
- **Protected routes**: Admin routes require authentication + admin role
- **Input validation**: All form inputs are validated before submission

---

## 🚀 **Getting Started Checklist**

- [ ] Create your regular user account
- [ ] Promote account to admin via Firebase Console
- [ ] Sign in and verify admin navigation appears
- [ ] Access admin dashboard at `/admin`
- [ ] Create your first grade level
- [ ] Add subjects to the grade
- [ ] Create topics/lessons for subjects
- [ ] Test the curriculum from student perspective

---

## 📞 **Support**

If you encounter any issues setting up the admin system:

1. **Check Firebase Console**: Verify your user document has the correct `role` field
2. **Clear Browser Cache**: Sometimes role changes require a fresh login
3. **Check Console Logs**: Look for any authentication or permission errors
4. **Verify Firebase Config**: Ensure your Firebase project is properly configured

The admin system is designed to be intuitive and powerful, allowing you to easily manage all aspects of your curriculum content. Happy teaching! 🎓 