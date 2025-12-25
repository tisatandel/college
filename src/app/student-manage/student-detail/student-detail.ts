import { Component, inject, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from '../../services/student/student';

@Component({
  selector: 'app-student-detail',
  imports: [],
  templateUrl: './student-detail.html',
  styleUrl: './student-detail.css',
})
export class StudentDetail implements OnInit{
  email!:string;

  private route = inject(ActivatedRoute);
  private student = inject(Student);
  ngOnInit(): void {
    this.email=this.route.snapshot.paramMap.get('email') || '';
    
    console.log(this.email);
  }
  get StudentDetails() {
    return this.student.getStudentByEmail(this.email);
  }
}
