import { Component, OnInit, inject } from '@angular/core';
import { Teacher } from '../services/teacher/teacher';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Table } from '../share/table/table';
import { Form } from '../share/form/form';

@Component({
  selector: 'app-teacher-manage',
  standalone: true,
  imports: [RouterModule, CommonModule, Table, Form],
  templateUrl: './teacher-manage.html',
})
export class TeacherManage implements OnInit {

  private router = inject(Router);
  tableData: any[] = [];

  constructor(public teacher: Teacher) {}

  ngOnInit(): void {
    this.loadTeachers();
  }

  loadTeachers() {
    this.tableData = this.teacher.getTeachers();
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