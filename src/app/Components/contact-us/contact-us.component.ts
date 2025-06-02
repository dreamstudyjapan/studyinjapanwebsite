import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarModule } from '@angular/material/snack-bar';
import emailjs from 'emailjs-com';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatRadioModule,
    MatSelectModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ],
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
  standalone: true
})
export class ContactUsComponent {
  contactForm: FormGroup;
  isSubmitted: boolean = false;
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef,
    
  ) {
    this.contactForm = this.fb.group({
      // inquiryType: ['', Validators.required],
      // company: ['', Validators.required],
      user_name: ['', Validators.required],
      // furigana: ['', Validators.required],
      dobYear: ['', [Validators.required, Validators.min(1900), Validators.max(2025)]],
      dobMonth: ['', [Validators.required, Validators.min(1), Validators.max(12)]],
      dobDay: ['', [Validators.required, Validators.min(1), Validators.max(31)]],
      occupation: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cmail: ['', [Validators.required, Validators.email]],
      tel: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      address: ['', Validators.required],
      jlpt: ['', Validators.required],
      interestedCourse:['', Validators.required],
    });

  }



  sendEmail(event: Event) {
    event.preventDefault(); // Prevent default form submission behavior
    // Check if the form is invalid or empty
    // if (this.contactForm.invalid) {
      this.snackBar.open('Please fill all required fields correctly.', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['mat-toolbar', 'mat-warn'],
      });
      const config: MatSnackBarConfig = {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-top-right']
      };
  
      this.snackBar.open('Form submitted successfully!', 'Close', config);
      return;
    // }

    // Send email using EmailJS
    const formData = this.contactForm.value;

    // emailjs.send('service_p97djde', 'template_j7zu8ck', formData, 'comz45qAYvAVz05Lq')
    //   .then((response) => {
    //     this.snackBar.open('Message sent successfully!', 'Close', {
    //       duration: 3000,
    //       horizontalPosition: 'center',
    //       verticalPosition: 'top',
    //       panelClass: ['mat-toolbar', 'mat-primary'],
    //     });
    //     this.contactForm.reset();
    //     this.cdr.detectChanges(); 
    //   }, (error) => {
    //     console.error('Error sending email:', error);
    //     this.snackBar.open('Failed to send message. Please try again.', 'Close', {
    //       duration: 3000,
    //       horizontalPosition: 'center',
    //       verticalPosition: 'top',
    //       panelClass: ['mat-toolbar', 'mat-warn'],
    //     });
    //   });
  }

  // Reset Form (if you need to reset it entirely)
  resetForm() {
    this.contactForm.reset();
  }
}