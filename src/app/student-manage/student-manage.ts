import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Student } from '../services/student/student';
import { CommonModule } from '@angular/common';
import { Table } from '../share/table/table';
import { Form } from '../share/form/form';

@Component({
  selector: 'app-student-manage',
  standalone:true,
  imports: [RouterModule,CommonModule,Table,Form],
  templateUrl: './student-manage.html',
  styleUrl: './student-manage.css',
})
export class StudentManage {


  private router = inject(Router);
  tableData: any[] = [];

  constructor(private studentService: Student) {}

  ngOnInit(): void {
    this.loadStudents();  
  }

  loadStudents() {
    this.tableData = this.studentService.getStudents();
  }

  goToHome() {
    this.router.navigate(['/dashboard']);
  }

   
}
