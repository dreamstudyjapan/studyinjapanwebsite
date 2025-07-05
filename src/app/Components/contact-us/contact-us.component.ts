import { Component, ChangeDetectorRef } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarModule,
} from '@angular/material/snack-bar';
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
import { SendEmailService } from '../../Services/send-email.service';

export const emailMatchValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  const emailControl = group.get('email');
  const cmailControl = group.get('cmail');

  if (!emailControl || !cmailControl) {
    return null; // controls not found
  }

  const email = emailControl.value;
  const confirmEmail = cmailControl.value;

  // Only check if both have a value; required/format errors are handled separately.
  if (email && confirmEmail && email !== confirmEmail) {
    // Merge with any existing errors on cmailControl.
    cmailControl.setErrors({ ...cmailControl.errors, emailMismatch: true });
  } else {
    // Remove the emailMismatch error if it exists while preserving other errors.
    if (cmailControl.errors) {
      delete cmailControl.errors['emailMismatch'];
      if (!Object.keys(cmailControl.errors).length) {
        cmailControl.setErrors(null);
      }
    }
  }
  // Return null for the FormGroup validator.
  return null;
};

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
    private contactService: ContactUsService,
    private sendEmailService: SendEmailService
  ) {
    // ✅ Initialize form with custom validator
    this.contactForm = this.fb.group(
      {
        user_name: ['', Validators.required],
        dobYear: ['', [Validators.required, Validators.min(1900), Validators.max(2025)]],
        dobMonth: ['', [Validators.required, Validators.min(1), Validators.max(12)]],
        dobDay: ['', [Validators.required, Validators.min(1), Validators.max(31)]],
        occupation: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        cmail: ['', [Validators.required, Validators.email]],
        countryCode: ['+91', Validators.required],
        tel: ['', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]],
        address: ['', Validators.required],
        jlpt: ['', Validators.required],
        interestedCourse: ['', Validators.required],
        questions: ['', Validators.required],
      },
      {
        validators: emailMatchValidator  // Attach the custom group validator
      }
    );

    this.contactForm.get('email')?.valueChanges.subscribe(() => {
      this.contactForm.get('cmail')?.updateValueAndValidity();
    });
    
    this.contactForm.get('cmail')?.valueChanges.subscribe(() => {
      this.contactForm.get('cmail')?.updateValueAndValidity();
    });

  }

  contactUs(event: Event): void {
    event.preventDefault();

    // ✅ Mark email and cmail as touched so error shows
    this.contactForm.get('email')?.markAsTouched();
    this.contactForm.get('cmail')?.markAsTouched();

    if (this.contactForm.invalid) {
      this.snackBar.open('Please fill all required fields correctly.', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['mat-toolbar', 'mat-warn'],
      });
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
      tel: `${this.contactForm.value.countryCode}${this.contactForm.value.tel}`,
      address: this.contactForm.value.address,
      jlpt: this.contactForm.value.jlpt,
      interestedCourse: this.contactForm.value.interestedCourse,
      questions: this.contactForm.value.questions,
    };

    // ✅ Submit to backend
    this.contactService.saveContact(formData).subscribe({
      next: () => {
        this.snackBar.open('Your response has been submitted!', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['mat-toolbar', 'mat-primary'],
        });
        this.contactForm.reset();
        this.cdr.detectChanges();
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
      },
    });

    // ✅ Send email via backend
    this.sendEmailService.sendEmail(formData).subscribe({
      next: (res) => {
        console.log('Email sent:', res);
      },
      error: (err) => {
        console.error('Failed to send email:', err);
      },
    });
  }

  resetForm(): void {
    this.contactForm.reset();
  }
}
