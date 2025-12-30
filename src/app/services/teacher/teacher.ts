import { Injectable } from '@angular/core';
import { Gender, person } from '../../interface/interface';

@Injectable({ providedIn: 'root' })
export class Teacher {
  teachers: person[] = [];
  data: person = { name: '', phone: 0, email: '', address: '', gender: Gender.Male };
  editIndex: number | null = null;

  getTeachers() {
    return this.teachers;
  }

  addTeacher() {
    this.data = { name: '', phone: 0, email: '', address: '', gender: Gender.Male };
    this.editIndex = null;
  }

  saveTeacher(person: person) {
    if (this.editIndex !== null) {
      this.teachers[this.editIndex] = person;
    } else {
      this.teachers.push(person);
    }
    this.addTeacher(); // Reset form
  }

  deleteTeacher(index: number) {
    this.teachers.splice(index, 1);
  }

  editTeacher(index: number) {
    this.data = { ...this.teachers[index] };
    this.editIndex = index;
  }

  getTeacherByEmail(email: string) {
    return this.teachers.find(t => t.email === email);
  }

  

  getTeacherCount():number {
    return this.teachers.length;

  }
}
