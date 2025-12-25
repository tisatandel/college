import { Component, EventEmitter, Input, Output, Signal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Teacher } from '../../services/teacher/teacher';

@Component({
  selector: 'app-form',
  imports: [FormsModule],
  templateUrl: './form.html',
  styleUrl: './form.css',
})
export class Form {
@Input() data = {
    name: '',
    phone: 0,     
    email: '',
    address: '',
    gender: '',
  };

  @Input() editIndex: number | null = null;
  @Output() save = new EventEmitter<any>();

  constructor(public t: Teacher) {}

  submit() {
    this.save.emit(this.data);
    console.log(this.data);
  }



}
