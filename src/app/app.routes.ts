import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { CoursesComponent } from './Components/courses/courses.component';
import { ContactUsComponent } from './Components/contact-us/contact-us.component';
import { ApplicationEnrollmentComponent } from './Components/application-enrollment/application-enrollment.component';
import { RequiredDocumentComponent } from './Components/required-document/required-document.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' }, // Default route is home
    { path: 'home', component: HomeComponent },
    { path: 'courses-overview', component: CoursesComponent },
    { path: 'application-Enroll', component: ApplicationEnrollmentComponent },
    { path: 'required-Doc', component: RequiredDocumentComponent },
    { path: 'contact-us', component: ContactUsComponent },
];
