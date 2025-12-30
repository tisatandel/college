import { Injectable } from '@angular/core';
import { Gender, person } from '../../interface/interface';

@Injectable({ providedIn: 'root' })
export class Teacher {

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

  // ------------------------
  getTeachers() {
    return this.teachers;
  }

  getTeacherCount(): number {
    return this.teachers.length;
  }

  // ------------------------
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

  // ------------------------
  saveTeacher(person: person) {
    if (this.editIndex !== null) {
      this.teachers[this.editIndex] = person;
    } else {
      this.teachers.push(person);
    }
    this.addTeacher();
  }

  // ------------------------
  editTeacher(index: number) {
    this.data = { ...this.teachers[index] };
    this.editIndex = index;
  }

  // ------------------------
  deleteTeacher(index: number) {
    this.teachers.splice(index, 1);
  }

  // ------------------------
  getTeacherByEmail(email: string) {
    return this.teachers.find(t => t.email === email);
  }
}