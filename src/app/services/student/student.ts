import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Student {

  showForm = false;

  students = [
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

  addStudent() {
    this.data = { name: '', phone: 0, email: '', address: '', gender: '' };
    this.editIndex = null;
    this.showForm = true;
  }

  saveStudent(studentValue: any) {
    if (this.editIndex !== null) {
      // update existing student
      this.students[this.editIndex] = { ...studentValue };
    } else {
      // add new student
      this.students.push({ ...studentValue });
    }
    this.showForm = false;
    this.editIndex = null;
    this.data = { name: '', phone: 0, email: '', address: '', gender: '' };
  }

  deleteStudent(index: number) {
    this.students.splice(index, 1);
  }

  editStudent(index: number) {
    this.editIndex = index;
    this.data = { ...this.students[index] };
    this.showForm = true;
  }

  getStudents() {
    return this.students;
  }
  
}
