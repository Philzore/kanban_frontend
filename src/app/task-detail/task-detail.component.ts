import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent {
  task = new FormControl('', [Validators.required]);
  name = new FormControl('', [Validators.required]);

  taskName = '' ;
  assignedName = '' ;

  constructor( @Inject(MAT_DIALOG_DATA) public data: any) 
  {
    console.log(this.data);
    this.taskName = this.data.title ;
    this.assignedName = this.data.assigned_to ;
  }

  getErrorMessage(form) {
    switch (form) {
      case 'task':
        if (this.task.hasError('required')) {
          return 'You must enter a task ';
        }
        break;
      case 'name':
        if (this.name.hasError('required')) {
          return 'You must enter a name';
        }
        break;

      default:
        break;
    }
    return ''
  }

  saveTask() {

  }
}
