import { Component, OnInit, inject } from '@angular/core';
import { Student } from '../services/student/student';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Table } from '../share/table/table';
import { Form } from '../share/form/form';

@Component({
  selector: 'app-student-manage',
  standalone: true,
  imports: [RouterModule, CommonModule, Table, Form],
  templateUrl: './student-manage.html',
})
export class StudentManage implements OnInit {

  private router = inject(Router);
  tableData: any[] = [];

  constructor(public student: Student) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents() {
    this.tableData = this.student.getStudents();
  }

  openModal() {
    const modal = document.getElementById('exampleModal');
    if (modal) {
      const bsModal = new (window as any).bootstrap.Modal(modal);
      bsModal.show();
    }
  }

  closeModal() {
    const modal = document.getElementById('exampleModal');
    if (modal) {
      const bsModal = (window as any).bootstrap.Modal.getInstance(modal);
      bsModal.hide();
    }
  }

  goToHome() {
    this.router.navigate(['/dashboard']);
  }
}