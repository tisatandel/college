import { Component, inject, OnInit } from '@angular/core'; // OnInit add kiya
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Teacher } from '../../services/teacher/teacher';
import { CommonModule } from '@angular/common'; // CommonModule import karein

@Component({
  selector: 'app-teacher-detail',
  standalone: true, // Standalone component hai toh imports zaroori hain
  imports: [RouterLink, CommonModule],
  templateUrl: './teacher-detail.html',
  styleUrl: './teacher-detail.css',
})
export class TeacherDetail implements OnInit { // OnInit add kiya
  email: string = '';
  private route = inject(ActivatedRoute);
  private teacher = inject(Teacher);

  ngOnInit(): void {
    // URL se email lena
    this.email = this.route.snapshot.paramMap.get('email') || '';
    
    // Sabse important: Agar service ka array khali hai toh use bharo
    this.teacher.getAll().subscribe((res) => {
      this.teacher.teachers = res; // Direct assignment bina tap ke
    });
  }

  get TeacherDetails() {
    // Ab ye function array se data dhoond lega
    return this.teacher.getTeacherByEmail(this.email);
  }
}