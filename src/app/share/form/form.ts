import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-forms',
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
    phone: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl(''),
    gender: new FormControl('male')
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

      this.forms.reset({ gender: 'male' }); // Reset form
    } else {
      this.forms.markAllAsTouched(); // Highlight validation errors
    }
  }
}