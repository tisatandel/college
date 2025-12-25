import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.routes')
        .then(m => m.DASHBOARD_ROUTES)
  },

  {
    path: 'teacher-manage',
    loadChildren: () =>
      import('./teacher-manage/teacher-manage.routes')
        .then(m => m.TEACHER_ROUTES)
  },

  {
    path: 'student-manage',
    loadChildren: () =>
      import('./student-manage/student-manage.routes')
        .then(m => m.STUDENT_ROUTES)
  },

  // default route
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },

  {
    path:'student-manage/:email',
    loadComponent:() => import('./student-manage/student-detail/student-detail').then(m => m.StudentDetail)
  },
  {
    path:'teacher-manage/:email',
    loadComponent:() => import('./teacher-manage/teacher-detail/teacher-detail').then(m => m.TeacherDetail)
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }

];
