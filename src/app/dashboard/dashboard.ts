import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from "@angular/router";
import { Student } from '../services/student/student';
import { Teacher } from '../services/teacher/teacher';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink,RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit{

  totalstudents!:number;
  totalteachers!:number;

  constructor(
    public student:Student,
    public teacher:Teacher
  ){}

  ngOnInit(): void {
    this.totalstudents = this.student.getStudentCount();
    this.totalteachers = this.teacher.getTeacherCount();
  }
}
