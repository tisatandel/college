import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Student } from '../services/student/student';
import { Form } from '../share/form/form';
import { Table } from '../share/table/table';
import { person } from '../interface/interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-student-manage',
  standalone: true,
  imports: [Form, Table],
  templateUrl: './student-manage.html',
  styleUrls: ['./student-manage.css']
})
export class StudentManage implements OnInit {
  private cdr = inject(ChangeDetectorRef);
  public student = inject(Student); 
  students$!: Observable<person[]>;
  editStudent: person | null = null;
  tableData: person[] = []; 

  ngOnInit() {
    this.loadStudents();
  }

  // Load all students
  loadStudents() {
    this.students$ = this.student.getAll();
    this.students$.subscribe(data => this.tableData = data); // table ke liye bhi set karo
  }

  // Add a new student
  addStudent(data: person) {
    this.student.add(data).subscribe((res: person) => {
      alert('Student Added Successfully');
      this.loadStudents();
    });
  }

  // Update existing student
  updateStudent(data: person) {
    if (!data.id) return alert('Student ID missing for update');
    this.student.update(data).subscribe(() => {
      alert('Student Updated Successfully');
      this.editStudent = null;
      this.loadStudents();
    });
  }

  // Delete a student
  deleteStudent(data: person) {
    if (data.id === undefined || data.id === null) return alert('Invalid Student ID');
    this.student.delete(data.id).subscribe(() => {
      alert('Student Deleted Successfully');
      this.loadStudents();
    });
  }

  // Prepare student for edit
  edit(data: person) {
    this.editStudent = { ...data };
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
    // Router navigate karne ke liye code yahan
  }
}
