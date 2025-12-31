import { Component, OnInit, inject } from '@angular/core';
import { Teacher } from '../services/teacher/teacher'; // your teacher service
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

  currentTeacher: any = null; // for edit
  editIndex: number | null = null; // index of teacher being edited

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

  // Edit teacher
  editTeacher(teacher: any) {
    this.currentTeacher = { ...teacher };
    this.editIndex = this.tableData.indexOf(teacher);
    this.openModal();
  }

  // Delete teacher
  deleteTeacher(teacher: any) {
    const index = this.tableData.indexOf(teacher);
    if (index > -1) {
      this.tableData.splice(index, 1);
      console.log('Deleted Teacher:', teacher);
    }
  }

  // Handle form submission (Add / Update)
  handleFormSubmit(formData: any) {
    if (this.editIndex !== null) {
      // Update existing
      this.tableData[this.editIndex] = { ...formData };
      console.log('Updated Teacher:', formData);
    } else {
      // Add new
      this.tableData.push(formData);
      console.log('Added Teacher:', formData);
    }

    // Reset
    this.currentTeacher = null;
    this.editIndex = null;
    this.closeModal();
  }

  goToHome() {
    this.router.navigate(['/dashboard']);
  }
}
