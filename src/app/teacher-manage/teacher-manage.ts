import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Teacher } from '../services/teacher/teacher';
import { CommonModule } from '@angular/common';
import { Table } from '../share/table/table';
import { Form } from '../share/form/form';

@Component({
  selector: 'app-teacher-manage',
  imports: [RouterModule,CommonModule,Table,Form],
  standalone:true,
  templateUrl: './teacher-manage.html',
  styleUrl: './teacher-manage.css',
})
export class TeacherManage implements OnInit{
  private router = inject(Router);
  tableData: any[] = [];

  constructor(private teacherService: Teacher) {}

  ngOnInit(): void {
    this.loadTeachers();   
  }

  loadTeachers() {
    this.tableData = this.teacherService.getTeachers();
  }
 
  goToHome() {
    this.router.navigate(['/dashboard']);
  }
}
