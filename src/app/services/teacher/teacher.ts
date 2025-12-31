import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gender, person } from '../../interface/interface';

/* ✅ Define TeacherData interface */
export interface TeacherData {
  id?: number;
  name: string;
  phone: number;
  email: string;
  address: string;
  gender: Gender;
}

@Injectable({ providedIn: 'root' })
export class Teacher {

  /* ✅ Local array for demo/temporary storage */
  teachers: person[] = [
    {
      name: 'Tisa Tandel',
      phone: 6351617713,
      email: 'tisa@gmail.com',
      address: 'Valsad',
      gender: Gender.female
    },
    {
      name: 'Amit Shah',
      phone: 9123456789,
      email: 'amit@gmail.com',
      address: 'Ahmedabad',
      gender: Gender.male
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

  getTeacherCount(): number {
    return this.teachers.length;
  }

  getTeachers(): person[] {
    return this.teachers;
  }

  addTeacher() {
    this.data = {
      name: '',
      phone: 0,
      email: '',
      address: '',
      gender: Gender.male
    };
    this.editIndex = null;
  }

  saveTeacher(p: person) {
    if (this.editIndex !== null) {
      this.teachers[this.editIndex] = p;
    } else {
      this.teachers.push(p);
    }
    this.addTeacher();
  }

  editTeacher(index: number) {
    this.data = { ...this.teachers[index] };
    this.editIndex = index;
  }

  deleteTeacher(index: number) {
    this.teachers.splice(index, 1);
  }

  getTeacherByEmail(email: string): person | undefined {
    return this.teachers.find(t => t.email === email);
  }

  /* ---------- HTTP CRUD ---------- */

  private apiUrl = 'http://localhost:3000/teachers';

  constructor(private http: HttpClient) {}

  getAll(): Observable<person[]> {
    return this.http.get<TeacherData[]>(this.apiUrl);
  }

  add(teacher: person): Observable<person> {
    return this.http.post<TeacherData>(this.apiUrl, teacher);
  }

  update(teacher: person): Observable<person> {
    return this.http.put<TeacherData>(`${this.apiUrl}/${teacher.id}`, teacher);
  }

  delete(id: number | string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
