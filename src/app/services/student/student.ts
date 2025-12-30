import { Injectable } from '@angular/core';
import { Gender, person } from '../../interface/interface';

@Injectable({ providedIn: 'root' })
export class Student {

  // ✅ Default data
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

  // ✅ Form bind data
  data: person = {
    name: '',
    phone: 0,
    email: '',
    address: '',
    gender: Gender.male
  };

  // ✅ Edit index
  editIndex: number | null = null;

  // ------------------------
  getStudents() {
    return this.students;
  }

  getStudentCount(): number {
    return this.students.length;
  }

  // ------------------------
  addStudent() {
    this.data = {
      name: '',
      phone: 0,
      email: '',
      address: '',
      gender: Gender.male
    };
    this.editIndex = null; // 👉 Save button
  }

  // ------------------------
  saveStudent(person: person) {
    if (this.editIndex !== null) {
      // UPDATE
      this.students[this.editIndex] = person;
    } else {
      // SAVE
      this.students.push(person);
    }
    this.addStudent(); // reset form
  }

  // ------------------------
  editStudent(index: number) {
    this.data = { ...this.students[index] };
    this.editIndex = index; // 👉 Update button
  }

  // ------------------------
  deleteStudent(index: number) {
    this.students.splice(index, 1);
  }

  // ------------------------
  getStudentByEmail(email: string) {
    return this.students.find(s => s.email === email);
  }
}