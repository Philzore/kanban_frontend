import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Task } from '../models/task.class';

@Component({
  selector: 'app-dialog-new-task',
  templateUrl: './dialog-new-task.component.html',
  styleUrls: ['./dialog-new-task.component.scss']
})
export class DialogNewTaskComponent {
  task = new FormControl('', [Validators.required]);
  name = new FormControl('', [Validators.required]);


  testArray = [];

  constructor(public dialogRef: MatDialogRef<DialogNewTaskComponent>) { }

  getErrorMessage() {
    if (this.task.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.name.hasError('required')) {
      return 'You must enter a value';
    }

    return ''
  }

  saveTask() {
    let task = new Task();
    task.task = this.task.getRawValue();
    task.for = this.name.getRawValue() ;

    this.testArray.push(task);

    console.log(this.testArray);
  }
}
