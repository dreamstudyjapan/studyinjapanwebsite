import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SendEmailService {
  private apiUrl = 'https://backend-alpha-eight-64.vercel.app/contact';
  
constructor(private http: HttpClient) {}

sendEmail(data: any): Observable<any> {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  return this.http.post(this.apiUrl, data, { headers });
}
}
