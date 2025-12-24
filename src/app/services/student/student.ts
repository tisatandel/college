import { Injectable } from '@angular/core';
import { StudentManage } from '../../student-manage/student-manage';

@Injectable({
  providedIn: 'root',
})
export class Student {
 
  students=[
    {name:'tisa',phone:6351617713,email:'tisa@gmail.com',address:'valsad',gender:'female'}
  ]
  getStudents() {
    return this.students;
  }
  addStudent(data: any) {
    this.students.push(data);
  }
}
