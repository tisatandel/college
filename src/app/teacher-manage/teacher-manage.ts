import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Teacher } from '../services/teacher/teacher'; // Teacher service
import { Form } from '../share/form/form';
import { Table } from '../share/table/table';
import { person } from '../interface/interface';
import { firstValueFrom, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-teacher-manage',
  standalone: true,
  imports: [Form, Table,AsyncPipe],
  templateUrl: './teacher-manage.html',
  styleUrls: ['./teacher-manage.css']
})
export class TeacherManage implements OnInit {

  
  private cdr = inject(ChangeDetectorRef);
  public teacher = inject(Teacher); // teacher service

  teachers$!: Observable<person[]>;

  editTeacher: person | null = null;
  tableData: person[] = [];

  ngOnInit() {
    this.loadTeachers();
  }

  // Load all teachers
  // loadTeachers() {
  //   this.teachers$ = this.teacher.getAll();
  //   this.teachers$.subscribe(data => this.tableData = data); // table ke liye
  // }
protected loadTeachers(): void {
  console.log('loadTeachers');
  this.teachers$ = this.teacher.getAll();
}
  // // Add a new teacher
  //  addTeacher(data: person) {
  // this.teacher.add(data).subscribe((res: person) => {
  //  alert('Teacher Added Successfully');
  //  this.loadTeachers();
  //  });
  //  }

   async addTeacher(data: person) {
   if (!data) return;

   try {
      const res = await firstValueFrom(this.teacher.add(data));

      console.log('Added Teacher:', res);
      alert('Teacher Added Successfully');
      
     this.loadTeachers();

    } catch (error) {
      console.error('Error adding teacher:', error);
     alert('Failed to add teacher. Please try again!');
    }
 }



  // Update existing teacher
  // updateTeacher(data: person) {
  //   if (!data.id) return alert('Teacher ID missing for update');
  //   this.teacher.update(data).subscribe(() => {
  //     alert('Teacher Updated Successfully');
  //     this.editTeacher = null;
  //     this.loadTeachers();
  //   });
  // }

  async updateTeacher(data: person) {
  if (!data.id) {
    alert('Teacher ID missing for update');
    return;
  }

  try {
    await firstValueFrom(this.teacher.update(data));

    alert('Teacher Updated Successfully');
    this.editTeacher = null;

    // reload list
    this.loadTeachers();

  } catch (error) {
    console.error('Error updating teacher:', error);
    alert('Failed to update teacher. Please try again!');
  }
}


  // Delete a teacher
  deleteTeacher(data: person) {
    if (data.id === undefined || data.id === null) return alert('Invalid Teacher ID');
    this.teacher.delete(data.id).subscribe(() => {
      alert('Teacher Deleted Successfully');
      this.loadTeachers();
    });
  }

  // Prepare teacher for edit
  edit(data: person) {
    this.editTeacher = { ...data };
  }

  openModal() {
    const modal = document.getElementById('teacherModal');
    if (modal) {
      const bsModal = new (window as any).bootstrap.Modal(modal);
      bsModal.show();
    }
  }

  closeModal() {
    const modal = document.getElementById('teacherModal');
    if (modal) {
      const bsModal = (window as any).bootstrap.Modal.getInstance(modal);
      bsModal.hide();
    }
  }

  goToHome() {
    // Router navigate ke liye code
  }
}
