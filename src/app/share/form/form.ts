import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { person } from '../../interface/interface';


interface personForm {
  id: FormControl<string | null>;
  name: FormControl<string | null>;
  email: FormControl<string | null>;
  phone: FormControl<number | null>;
  address: FormControl<string | null>;
  gender: FormControl<string | null>
}
@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './form.html',
})
export class Form {
  @Input() data!: person;                // form data
  @Input() editIndex!: number | null;    // null = Add, number = Edit
  @Output() save = new EventEmitter<person>();

  form = new FormGroup<personForm>({
    id: new FormControl(null), 
    name: new FormControl(null, Validators.required),
    email: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@tag97(\.[a-zA-Z]{2,})?$/)
    ]),
    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern('^[6-9]\\d{9}$')
    ]),
    address: new FormControl(null, Validators.required),
    gender: new FormControl(null, Validators.required)
  });

  submit() {
    this.save.emit(this.data);            // emit data to parent
  }
}