import { Injectable } from '@angular/core';
import { Gender, person } from '../../interface/interface';

@Injectable({ providedIn: 'root' })
export class Student {
  students: person[] = [];
  data: person = { name: '', phone: 0, email: '', address: '', gender: Gender.Male };
  editIndex: number | null = null;

  getStudents() {
    return this.students;
  }

  addStudent() {
    this.data = { name: '', phone: 0, email: '', address: '', gender: Gender.Male };
    this.editIndex = null;
  }

  saveStudent(person: person) {
    if (this.editIndex !== null) {
      this.students[this.editIndex] = person;
    } else {
      this.students.push(person);
    }
    this.addStudent(); // Reset form
  }

  deleteStudent(index: number) {
    this.students.splice(index, 1);
  }

  editStudent(index: number) {
    this.data = { ...this.students[index] };
    this.editIndex = index;
  }

  getStudentByEmail(email: string) {
    return this.students.find(s => s.email === email);
  }

  getStudentCount():number {
    return this.students.length;

  }
}
