import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
  
    {
      path: 'home',
      loadComponent: () =>
        import('./Components/home/home.component').then((m) => m.HomeComponent)
    },
    {
      path: 'courses-overview',
      loadComponent: () =>
        import('./Components/courses/courses.component').then((m) => m.CoursesComponent)
    },
    {
      path: 'application-Enroll',
      loadComponent: () =>
        import('./Components/application-enrollment/application-enrollment.component').then((m) => m.ApplicationEnrollmentComponent)
    },
    {
      path: 'required-Doc',
      loadComponent: () =>
        import('./Components/required-document/required-document.component').then((m) => m.RequiredDocumentComponent)
    },
    {
      path: 'contact-us',
      loadComponent: () =>
        import('./Components/contact-us/contact-us.component').then((m) => m.ContactUsComponent)
    },
    {
      path: 'about-us',
      loadComponent: () =>
        import('./Components/aboutus/aboutus.component').then((m) => m.AboutusComponent)
    },
  ];
