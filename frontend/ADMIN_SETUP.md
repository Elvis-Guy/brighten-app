# Admin Panel Setup and Usage Guide

## Overview

The Brighten app now includes a fully functional admin panel for managing curriculum content. This allows administrators to create, edit, and delete grades, subjects, and topics through a user-friendly interface.

## Admin Pages Created

### 1. Admin Dashboard (`/admin`)
- **Overview statistics** showing total grades, subjects, topics, and active grades
- **Quick navigation** to all admin management pages
- **Recent items display** showing the latest grades, subjects, and topics
- **Permission-based access** - only shows functions the user has permission for

### 2. Grades Management (`/admin/grades`)
- **View all grades** in a searchable table
- **Create new grades** with name, number, description, and active status
- **Edit existing grades** with inline form
- **Delete grades** with confirmation dialog
- **Permissions required**: `canCreateGrades`, `canEditGrades`, `canDeleteGrades`

### 3. Subjects Management (`/admin/subjects`)
- **View all subjects** with associated grade information
- **Create new subjects** with name, code, description, grade assignment, and color
- **Edit existing subjects** with all properties
- **Delete subjects** (also deletes associated topics)
- **Color coding** for visual organization
- **Topic count display** showing number of topics per subject
- **Permissions required**: `canCreateSubjects`, `canEditSubjects`, `canDeleteSubjects`

### 4. Topics Management (`/admin/topics`)
- **View all topics** with subject and grade information
- **Create new topics** with title, description, content, difficulty, and estimated time
- **Edit existing topics** with full content management
- **Delete topics** with confirmation
- **Difficulty levels**: Beginner, Intermediate, Advanced (color-coded)
- **Estimated time tracking** for learning planning
- **Subject association** with automatic grade assignment
- **Permissions required**: `canCreateTopics`, `canEditTopics`, `canDeleteTopics`

## Firebase Integration

### Database Collections
- **`curriculum_grades`**: Stores grade information
- **`curriculum_subjects`**: Stores subject information with grade references
- **`curriculum_topics`**: Stores topic content with subject references

### CRUD Operations
All admin operations are fully integrated with Firebase Firestore:

#### Grades
- `createGrade(gradeData)` - Creates new grade
- `updateGrade(gradeId, gradeData)` - Updates existing grade
- `deleteGrade(gradeId)` - Deletes grade
- `getAllGrades()` - Retrieves all grades (sorted by grade number)

#### Subjects
- `createSubject(subjectData)` - Creates new subject
- `updateSubject(subjectId, subjectData)` - Updates existing subject
- `deleteSubject(subjectId)` - Deletes subject and associated topics
- `getAllSubjects(gradeId?)` - Retrieves subjects (optionally filtered by grade)

#### Topics
- `createTopic(topicData)` - Creates new topic (auto-updates subject topic count)
- `updateTopic(topicId, topicData)` - Updates existing topic
- `deleteTopic(topicId)` - Deletes topic (auto-updates subject topic count)
- `getAllTopics(subjectId?)` - Retrieves topics (optionally filtered by subject)

### Index Optimization
- **No composite indexes required** - all queries use single-field indexes
- **JavaScript sorting** used instead of Firestore `orderBy` to avoid index requirements
- **Automatic index creation** for single fields (`isActive`, `gradeNumber`, etc.)

## Permission System

### Admin Permissions
The admin system uses a role-based permission system:

```typescript
interface AdminPermissions {
  canCreateGrades: boolean;
  canEditGrades: boolean;
  canDeleteGrades: boolean;
  canCreateSubjects: boolean;
  canEditSubjects: boolean;
  canDeleteSubjects: boolean;
  canCreateTopics: boolean;
  canEditTopics: boolean;
  canDeleteTopics: boolean;
  canViewAnalytics: boolean;
  canManageUsers: boolean;
}
```

### Access Control
- **Page-level protection**: All admin pages wrapped with `AdminRoute` component
- **Feature-level permissions**: Buttons and actions only show if user has permission
- **API-level validation**: All Firebase operations check permissions before executing

## UI Features

### Design System
- **Consistent color coding**: Blue for grades, Green for subjects, Purple for topics
- **Responsive design**: Works on desktop, tablet, and mobile
- **Loading states**: Proper loading indicators during operations
- **Error handling**: User-friendly error messages with retry options
- **Form validation**: Client-side validation with required fields

### User Experience
- **Breadcrumb navigation**: Easy navigation between admin sections
- **Inline editing**: Edit items without leaving the list view
- **Bulk operations**: Select and manage multiple items (future enhancement)
- **Search and filtering**: Find specific items quickly (future enhancement)
- **Sorting**: Automatic sorting by logical order (grade number, subject name, topic order)

## Data Flow

### Creation Flow
1. User fills out form in admin interface
2. Client-side validation ensures required fields
3. Permission check via `checkAdminPermission()`
4. Firebase operation with automatic metadata (createdAt, createdBy, etc.)
5. Success: Reload data and reset form
6. Error: Display user-friendly error message

### Update Flow
1. User clicks edit button to populate form with existing data
2. User modifies fields and submits
3. Permission check for edit operations
4. Firebase update with `updatedAt` timestamp
5. Reload data to reflect changes

### Delete Flow
1. User clicks delete button
2. Confirmation dialog prevents accidental deletions
3. Permission check for delete operations
4. Firebase deletion (cascades for subjects → topics)
5. Reload data to reflect changes

## Security Considerations

### Firestore Security Rules
Ensure your Firestore security rules allow admin operations:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Admin collections - restrict to admin users
    match /curriculum_grades/{gradeId} {
      allow read, write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isAdmin == true;
    }
    
    match /curriculum_subjects/{subjectId} {
      allow read, write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isAdmin == true;
    }
    
    match /curriculum_topics/{topicId} {
      allow read, write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isAdmin == true;
    }
  }
}
```

### Authentication Requirements
- **Admin role required**: Users must have `isAdmin: true` in their user document
- **Permission granularity**: Specific permissions for each operation type
- **Session validation**: Admin status checked on each operation

## Future Enhancements

### Planned Features
- **Bulk operations**: Select multiple items for batch actions
- **Import/Export**: CSV import/export for curriculum data
- **Version control**: Track changes and restore previous versions
- **Analytics dashboard**: Usage statistics and learning analytics
- **Content preview**: Preview how content appears to students
- **Rich text editor**: WYSIWYG editor for topic content
- **Media management**: Upload and manage images/videos for topics

### Technical Improvements
- **Caching**: Implement client-side caching for better performance
- **Pagination**: Handle large datasets with pagination
- **Real-time updates**: Live updates when other admins make changes
- **Offline support**: Allow admin operations when offline
- **Audit logging**: Track all admin actions for compliance

## Troubleshooting

### Common Issues
1. **Permission Denied**: Ensure user has admin role and specific permissions
2. **Index Errors**: Should not occur with current implementation (no composite indexes)
3. **Form Validation**: Check required fields and data types
4. **Network Errors**: Implement retry logic for failed operations

### Debug Mode
Enable Firebase debug mode by setting:
```javascript
NEXT_PUBLIC_ENABLE_FIREBASE_DEV=true
```

This enables detailed logging of all Firebase operations.

## Deployment Notes

### Environment Variables
Ensure all Firebase environment variables are set in production:
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

### Build Verification
The admin pages are included in the production build:
- `/admin` - 3.13 kB
- `/admin/grades` - 2.94 kB
- `/admin/subjects` - 3.21 kB
- `/admin/topics` - 3.58 kB

All pages are statically generated for optimal performance. 