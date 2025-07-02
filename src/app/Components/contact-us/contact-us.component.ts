import { Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import emailjs from 'emailjs-com';
import { ContactUsService } from '../../Services/contact-us.service';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatRadioModule,
    MatSelectModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    
  ],
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
})
export class ContactUsComponent {
  contactForm: FormGroup;
  isSubmitted = false;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef,
    private contactService: ContactUsService
  ) {
    this.contactForm = this.fb.group({
      user_name: ['', Validators.required],
      dobYear: ['', [Validators.required, Validators.min(1900), Validators.max(2025)]],
      dobMonth: ['', [Validators.required, Validators.min(1), Validators.max(12)]],
      dobDay: ['', [Validators.required, Validators.min(1), Validators.max(31)]],
      occupation: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cmail: ['', [Validators.required, Validators.email]],
      tel: ['', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]],
      address: ['', Validators.required],
      jlpt: ['', Validators.required],
      interestedCourse: ['', Validators.required],
      questions: ['', Validators.required],
    });
  }

  contactUs(event: Event): void {
    event.preventDefault();
  
    if (this.contactForm.invalid) {
      const config: MatSnackBarConfig = {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['mat-toolbar', 'mat-warn'],
      };
      this.snackBar.open('Please fill all required fields correctly.', 'Close', config);
      return;
    }
  
    this.loading = true;
  
    const formData = {
      name: this.contactForm.value.user_name,
      dobYear: this.contactForm.value.dobYear,
      dobMonth: this.contactForm.value.dobMonth,
      dobDay: this.contactForm.value.dobDay,
      occupation: this.contactForm.value.occupation,
      email: this.contactForm.value.email,
      cmail: this.contactForm.value.cmail,
      tel: this.contactForm.value.tel,
      address: this.contactForm.value.address,
      jlpt: this.contactForm.value.jlpt,
      interestedCourse: this.contactForm.value.interestedCourse,
      questions: this.contactForm.value.questions,
    };
  
    // Submit to backend
    this.contactService.saveContact(formData).subscribe({
      next: (response) => {
        // console.log('Saved to backend:', response);
  
        // ✅ Show snackbar if status is 200 or response.success = true
        // if (response) {
          this.snackBar.open('Your response has been submitted!', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['mat-toolbar', 'mat-primary'],
          });
  
          this.contactForm.reset();
          this.cdr.detectChanges();
        // }
  
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        console.error('Backend save failed:', error);
        this.snackBar.open('Failed to submit response. Please try again.', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['mat-toolbar', 'mat-warn'],
        });
      }
    });
  
    // Optionally, you can enable this again
    /*
    emailjs.send('service_p97djde', 'template_j7zu8ck', formData, 'comz45qAYvAVz05Lq')
      .then(
        (response) => {
          console.log('Email sent:', response);
        },
        (error) => {
          console.error('Email send failed:', error);
        }
      );
    */
  }
  

  resetForm(): void {
    this.contactForm.reset();
  }
}
