import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Teacher } from '../services/teacher/teacher';
import { CommonModule } from '@angular/common';
import { Table } from '../share/table/table';
import { Form } from '../share/form/form';

declare var bootstrap: any; // Bootstrap modal

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

  saveTeacher(data: any) {
    this.teacher.saveTeacher(data);
    this.loadTeachers();

    // Hide the modal after save/update
    const modalEl: any = document.getElementById('exampleModal');
    const modalInstance = bootstrap.Modal.getInstance(modalEl);
    if (modalInstance) {
      modalInstance.hide();
    }
  }

  deleteTeacher(index: number) {
    this.teacher.deleteTeacher(index);
    this.loadTeachers();
  }

  openModal(mode: 'add' | 'edit', index?: number) {
    if (mode === 'add') {
      this.teacher.addTeacher();
    } else if (mode === 'edit' && index !== undefined) {
      this.teacher.editTeacher(index);
    }

    // Open Bootstrap modal
    const modalEl: any = document.getElementById('exampleModal');
    const modal = new bootstrap.Modal(modalEl);
    modal.show();
  }

  goToHome() {
    this.router.navigate(['/dashboard']);
  }
}
