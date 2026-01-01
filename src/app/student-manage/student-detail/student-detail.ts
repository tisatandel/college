import { Component, inject, OnInit } from '@angular/core'; // OnInit add kiya
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Student } from '../../services/student/student';
import { CommonModule } from '@angular/common'; // CommonModule import karein

@Component({
  selector: 'app-student-detail',
  standalone: true, // Standalone component hai toh imports zaroori hain
  imports: [RouterLink, CommonModule],
  templateUrl: './student-detail.html',
  styleUrl: './student-detail.css',
})
export class StudentDetail implements OnInit { // OnInit add kiya
  email: string = '';
  private route = inject(ActivatedRoute);
  private student = inject(Student);

  ngOnInit(): void {
    // URL se email lena
    this.email = this.route.snapshot.paramMap.get('email') || '';
    
    // Sabse important: Agar service ka array khali hai toh use bharo
    this.student.getAll().subscribe((res) => {
      this.student.students = res; // Direct assignment bina tap ke
    });
  }

  get StudentDetails() {
    // Ab ye function array se data dhoond lega
    return this.student.getStudentByEmail(this.email);
  }
}