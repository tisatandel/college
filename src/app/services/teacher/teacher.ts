import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Teacher {
  teachers=[
    {name:'twisa',phone:9904240331,email:'twisa@gmail.com',address:'surat',gender:'female'}
  ]
  getTeachers() {
    return this.teachers;
  }
  addTeacher(data: any) {
    this.teachers.push(data);
  }
}
