import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Teacher } from '../../services/teacher/teacher';

@Component({
  selector: 'app-teacher-detail',
  imports: [],
  templateUrl: './teacher-detail.html',
  styleUrl: './teacher-detail.css',
})
export class TeacherDetail {
email!:string;
private route = inject(ActivatedRoute);
  private teacher = inject(Teacher);
  ngOnInit(): void {
    this.email=this.route.snapshot.paramMap.get('email') || '';
    
    console.log(this.email);
  }
  get TeacherDetails() {
    return this.teacher.getTeacherByEmail(this.email);
  }
}
