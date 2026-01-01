import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-table',
  standalone: true,
  imports:[RouterLink,CommonModule],
  templateUrl: './table.html',
})
export class Table {
  // @Input() data: any[] = [];
  @Input() data: any[] | null = [];

  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  
}
