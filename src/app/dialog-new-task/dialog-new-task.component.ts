import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from '../models/task.class';
import { BackendService } from '../services/backend-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dialog-new-task',
  templateUrl: './dialog-new-task.component.html',
  styleUrls: ['./dialog-new-task.component.scss']
})
export class DialogNewTaskComponent {
  task = new FormControl('', [Validators.required]);
  name = new FormControl('', [Validators.required]);


  testArray = [];

  constructor(
    public dialogRef: MatDialogRef<DialogNewTaskComponent>,
    private backendService: BackendService,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  /**
    * error message for form field
    * 
    * @returns {string} - error message
    */
  getErrorMessage(form) {
    switch (form) {
      case 'task':
        if (this.task.hasError('required')) {
          return 'You must enter a task';
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

  /**
   * save new task and push it in todo array
   * 
   */
  async saveTask() {
    try {
      let resp: any = await this.backendService.addTask(this.task.value, this.name.value, this.data.currentChannelId);
      const lastAddedElement = resp[resp.length - 1];
      this.backendService.todo.push(lastAddedElement);

      this.dialogRef.close();
    } catch (error) {
      console.log('Error when create new Channel', error);
    }
  }

}
