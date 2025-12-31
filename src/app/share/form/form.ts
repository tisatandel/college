import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form.html',
  styleUrls: ['./form.css']
})
export class Form implements OnChanges {
  @Input() editData: any = null;
  @Output() added = new EventEmitter<any>();
  @Output() updated = new EventEmitter<any>();

  forms = new FormGroup({
    id: new FormControl(null, Validators.required), 
    name: new FormControl('', Validators.required),
    phone: new FormControl('',Validators.pattern('^[6-9]\\d{9}$')),
    email: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@tag97(\.[a-zA-Z]{2,})?$/)]),
    address: new FormControl(''),
    gender: new FormControl('')
  });

  ngOnChanges(changes: SimpleChanges) {
    if (changes['editData']?.currentValue) {
      this.forms.patchValue(this.editData);
      this.forms.get('id')?.disable(); 
    } else {
      this.forms.reset({ gender: 'male' });
      this.forms.get('id')?.enable(); 
    }
  }

  submit() {
    if (this.forms.valid) {
      const formData = this.forms.getRawValue();

      if (this.editData) {
        this.updated.emit(formData); 
      } else {
        this.added.emit(formData); 
      }

      this.forms.reset({ gender: 'male' }); 
    } else {
      this.forms.markAllAsTouched(); 
    }
  }
}