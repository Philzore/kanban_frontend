import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
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
    ) { }

  getErrorMessage() {
    if (this.task.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.name.hasError('required')) {
      return 'You must enter a value';
    }

    return ''
  }

  async saveTask() {
    const channelId = this.route.snapshot.paramMap.get('channelId');
    debugger;
    try {
      let resp:any = await this.backendService.addTask(this.task.value, this.name.value, channelId);
      
    } catch (error) {
      console.log('Error when create new Channel', error);
    }

    console.log(this.testArray);
  }
}
