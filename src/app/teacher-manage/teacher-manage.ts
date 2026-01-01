import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Teacher } from '../services/teacher/teacher'; 
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
  public teacher = inject(Teacher);
  allTeachers: person[] = [];
  teachers$!: Observable<person[]>;
  editTeacher: person | null = null;
  
  // Local storage se data dikhane ke liye (Optional, agar aap API use kar rahe hain)
  tableData: person[] = [];

  async ngOnInit() {
  // 1. Table load karne ke liye
  this.loadTeachers();

  // 2. Card Count ke liye (Initial Load)
  // Bina subscribe ke service ke array ko bharne ke liye:
  try {
    const data = await firstValueFrom(this.teacher.getAll());
    this.teacher.teachers = data; 
    this.cdr.detectChanges();
  } catch (error) {
    console.error("Initial load count error:", error);
  }
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

// async addTeacher(data: person) {
//   if (!data) return;

//   try {
//     const res = await firstValueFrom(this.teacher.add(data));
//     console.log('Added Teacher:', res);
//     alert('Teacher Added Successfully');
//     this.loadTeachers();
//     // Change detection trigger karein taaki UI update ho jaye
//     this.cdr.detectChanges();
//   } catch (error) {
//     console.error('Error adding teacher:', error);
//     alert('Failed to add teacher. Please try again!');
//   }
// }

async addTeacher(data: person) {
  if (!data) return;
  try {
    const res = await firstValueFrom(this.teacher.add(data));
    
    // SERVICE ARRAY UPDATE: Bina tap/subscribe ke manually push karein
    this.teacher.teachers.push(res); 
    
    alert('Teacher Added Successfully');
    this.loadTeachers();
    this.cdr.detectChanges();
  } catch (error) {
    console.error('Error adding teacher:', error);
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


//   async updateTeacher(data: person) {
edit(event: any) {
  console.log('Table se data aaya:', event); 
  
  const displayId = event.displayId;
  const originalData = event.data;

  // Type assertion (as any) use karein taaki dbId add kar sakein
  const tempTeacher: any = { 
    ...originalData, 
    id: displayId 
  };

  // Asli Database ID ko ek temporary property mein store karein
  tempTeacher['dbId'] = originalData.id; 

  this.editTeacher = tempTeacher;

  this.cdr.detectChanges();
  this.openModal();
}

// async updateTeacher(formData: any) {
//   // Check karein ki editTeacher null toh nahi hai
//   if (!this.editTeacher) return;

//   // Type casting use karein taaki 'dbId' access ho sake
//   const selectedTeacher = this.editTeacher as any;

//   const payload = {
//     ...formData,
//     id: selectedTeacher.dbId // Form wali temporary ID ko asli DB ID se replace karein
//   };

//   try {
//     await firstValueFrom(this.teacher.update(payload));
//     alert('Updated Successfully!');
//     this.loadTeachers();
//     this.editTeacher = null;
//     this.cdr.detectChanges();
//     this.closeModal();
//   } catch (err) {
//     console.error('Update failed:', err);
//   }
// }

async updateTeacher(formData: any) {
  if (!this.editTeacher) return;
  const selectedTeacher = this.editTeacher as any;
  const payload = { ...formData, id: selectedTeacher.dbId };

  try {
    const res = await firstValueFrom(this.teacher.update(payload));
    
    // SERVICE ARRAY UPDATE: Index dhoond kar data replace karein
    const index = this.teacher.teachers.findIndex(t => t.id === payload.id);
    if (index !== -1) {
      this.teacher.teachers[index] = res;
    }

    alert('Updated Successfully!');
    this.loadTeachers();
    this.editTeacher = null;
    this.closeModal();
    this.cdr.detectChanges();
  } catch (err) {
    console.error('Update failed:', err);
  }
}

//   if (!data.id) {
//     alert('Teacher ID missing for update');
//     return;
//   }

//   try {
//     await firstValueFrom(this.teacher.update(data));

//     alert('Teacher Updated Successfully');
//     this.editTeacher = null;

//     // reload list
//     this.loadTeachers();
//     this.cdr.detectChanges();
//   } catch (error) {
//     console.error('Error updating teacher:', error);
//     alert('Failed to update teacher. Please try again!');
//   }
// }



//   // Edit Function: Error fix karne ke liye 'any' use kiya hai
//   edit(event: any) {
//     if (typeof event === 'number') {
//       // Agar Table component sirf index bhej raha hai
//       this.editTeacher = { ...this.tableData[event] };
//     } else {
//       // Agar Table component pura object bhej raha hai
//       this.editTeacher = { ...event };
//     }
    
//     this.openModal();
//     this.cdr.detectChanges();
//   }

  // deleteTeacher(event: any) {
  //   const id = event?.id ? event.id : event;
    
  //   if (confirm('Are you sure you want to delete?')) {
  //     // Agar API use kar rahe hain toh delete(id) call hoga
  //     this.teacher.delete(id).subscribe(() => {
  //       alert('Deleted Successfully');
  //       this.loadTeachers();
  //     });
  //   }
  // }

//   async deleteTeacher(event: any) {
//   // 1. Table se pura item aa raha hai, isliye uska asli ID nikalenge
//   const id = event?.id ? event.id : event;

//   if (confirm('Are you sure you want to delete?')) {
//     try {
//       // 2. Observable ko Promise mein badalkar wait karein (firstValueFrom)
//       await firstValueFrom(this.teacher.delete(id));
      
//       alert('Deleted Successfully');
      
//       // 3. Table refresh karein
//       this.loadTeachers();
      
//       // 4. Change detection trigger karein
//       this.cdr.detectChanges();
      
//     } catch (error) {
//       // 5. Agar API fail ho jaye toh yahan handle karein
//       console.error('Error deleting teacher:', error);
//       alert('Failed to delete. Please try again!');
//     }
//   }
// }

async deleteTeacher(event: any) {
  const id = event?.id ? event.id : event;
  if (confirm('Are you sure you want to delete?')) {
    try {
      await firstValueFrom(this.teacher.delete(id));

      // SERVICE ARRAY UPDATE: Filter se array chota karein taaki Count kam ho jaye
      this.teacher.teachers = this.teacher.teachers.filter(t => t.id !== id);

      alert('Deleted Successfully');
      this.loadTeachers();
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Error deleting teacher:', error);
    }
  }
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
      const instance = (window as any).bootstrap.Modal.getInstance(modal);
      if (instance) instance.hide();
    }
  }

  goToHome() {}
}