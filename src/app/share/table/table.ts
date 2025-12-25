import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Teacher } from '../../services/teacher/teacher';
import { Student } from '../../services/student/student';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-table',
  imports: [CommonModule, RouterLink],
  standalone:true,
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table {
@Input() data: any[] = [];
@Output() delete = new EventEmitter<number>(); 
@Output() edit = new EventEmitter<number>(); 

}
