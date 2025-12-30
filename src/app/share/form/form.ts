import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { person } from '../../interface/interface';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './form.html',
})
export class Form {
  @Input() data!: person;
  @Input() editIndex!: number | null;
  @Output() save = new EventEmitter<person>();

  submit() {
    this.save.emit(this.data);
  }
}
