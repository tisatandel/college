import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Teacher {
   
  showForm = false;

  teachers = [
    {
      name: 'tisa',
      phone: 6351617713,
      email: 'tisa@gmail.com',
      address: 'valsad',
      gender: 'female'
    }
  ];

 data = { name: '', phone: 0, email: '', address: '', gender: '' };

  editIndex: number | null = null;

  addTeacher() {
    this.data = { name: '', phone: 0, email: '', address: '', gender: '' };
    this.editIndex = null;
    this.showForm = true;
  }

  saveTeacher(studentValue: any) {
    if (this.editIndex !== null) {
      // update existing student
      this.teachers[this.editIndex] = { ...studentValue };
    } else {
      // add new student
      this.teachers.push({ ...studentValue });
    }
    this.showForm = false;
    this.editIndex = null;
    this.data = { name: '', phone: 0, email: '', address: '', gender: '' };
  }

  deleteTeacher(index: number) {
    this.teachers.splice(index, 1);
  }

  editTeacher(index: number) {
    this.editIndex = index;
    this.data = { ...this.teachers[index] };
    this.showForm = true;
  }

  getTeachers() {
    return this.teachers;
  }}
