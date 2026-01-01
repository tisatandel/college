import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gender, person } from '../../interface/interface';

/* ✅ Define StudentData interface */
export interface StudentData {
  id?: number;
  name: string;
  phone: number;
  email: string;
  address: string;
  gender: Gender;
}

@Injectable({ providedIn: 'root' })
export class Student {

  /* ✅ Local array for demo/temporary storage */
  students: person[] = [
    {
      name: 'Raj Dave',
      phone: 6351617714,
      email: 'raj@gmail.com',
      address: 'Valsad',
      gender: Gender.male
    },
    {
      name: 'Neha Patel',
      phone: 9876543210,
      email: 'neha@gmail.com',
      address: 'Surat',
      gender: Gender.female
    }
  ];

  data: person = {
    name: '',
    phone: 0,
    email: '',
    address: '',
    gender: Gender.male
  };

  editIndex: number | null = null;

  /* ---------- Local Array Functions ---------- */

  getStudents(): person[] {
    return this.students;
  }

  addStudent() {
    this.data = {
      name: '',
      phone: 0,
      email: '',
      address: '',
      gender: Gender.male
    };
    this.editIndex = null;
  }

  saveStudent(p: person) {
    if (this.editIndex !== null) {
      this.students[this.editIndex] = p;
    } else {
      this.students.push(p);
    }
    this.addStudent();
  }

  editStudent(index: number) {
    this.data = { ...this.students[index] };
    this.editIndex = index;
  }

  deleteStudent(index: number) {
    this.students.splice(index, 1);
  }

  getStudentByEmail(email: string): person | undefined {
  return this.students.find(s => s.email === email);}

  getStudentCount(): number {
    return this.students.length;
  }

  

  /* ---------- HTTP CRUD ---------- */

  private apiUrl = 'http://localhost:3000/students';

  constructor(private http: HttpClient) {}

  getAll(): Observable<person[]> {
    return this.http.get<person[]>(this.apiUrl);
  }

  add(student: person): Observable<person> {
    return this.http.post<person>(this.apiUrl, student);
  }

  update(student: person): Observable<person> {
    return this.http.put<person>(`${this.apiUrl}/${student.id}`, student);
  }

  delete(id: number | string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
