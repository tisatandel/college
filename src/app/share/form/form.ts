import { Component, Input, Signal, signal } from '@angular/core';
import { Student } from '../../services/student/student';
import { Teacher } from '../../services/teacher/teacher';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form',
  imports: [FormsModule],
  templateUrl: './form.html',
  styleUrl: './form.css',
})
export class Form {
@Input() data=
{ name:'',
phone:'',
email:'',
address:'',
gender:''
}

}
