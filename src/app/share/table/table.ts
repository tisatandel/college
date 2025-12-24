import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Teacher } from '../../services/teacher/teacher';
import { Student } from '../../services/student/student';

@Component({
  selector: 'app-table',
  imports: [CommonModule],
  standalone:true,
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table {
@Input() data: any[] = [];
 

}
