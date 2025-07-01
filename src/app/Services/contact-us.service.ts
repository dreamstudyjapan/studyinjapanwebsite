import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ContactFormData {
  name: string;
  dobYear: string;
  dobMonth: string;
  dobDay: string;
  occupation: string;
  email: string;
  cmail: string;
  tel: string;
  address: string;
  jlpt: string;
  interestedCourse: string;
  questions: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {
  private apiUrl = 'https://study-in-japan-backend.vercel.app/contact/save';

  constructor(private http: HttpClient) {}

  saveContact(formData: ContactFormData): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrl, formData, { headers });
  }
}
