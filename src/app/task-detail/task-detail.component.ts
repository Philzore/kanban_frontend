import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BackendService } from '../services/backend-service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent {
  task = new FormControl('', [Validators.required, Validators.minLength(3)]);
  name = new FormControl('', [Validators.required, Validators.minLength(3)]);

  taskName = '';
  assignedName = '';

  savingInProgress = false;
  savingError = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private backendService: BackendService,
    private dialogRef: MatDialogRef<TaskDetailComponent>,
  ) {
    this.taskName = this.data.title;
    this.assignedName = this.data.assigned_to;
  }

  getErrorMessage(form) {
    switch (form) {
      case 'task':
        if (this.task.hasError('required')) {
          return 'You must enter a task ';
        } else if (this.task.hasError('minlength')) {
          return 'You need three letters';
        }
        break;
      case 'name':
        if (this.name.hasError('required')) {
          return 'You must enter a name';
        } else if (this.name.hasError('minlength')) {
          return 'You need three letters';
        }
        break;

      default:
        break;
    }
    return ''
  }

  async saveTask() {
    if (!this.task.errors && !this.name.errors) {
      this.savingInProgress = true;
      let resp = await this.backendService.editSingleTask(this.data.id, this.taskName, this.assignedName);


      this.savingInProgress = false;
      if (resp['success'] == true) {
        this.findTaskArray();
        this.dialogRef.close();
      } else {
        this.savingError = true;
      }
    }

  }

  findTaskArray() {
    switch (this.data.category) {
      case 'to_do':
        this.backendService.todo = this.updateTaskArray(this.backendService.todo);
        break;
      case 'in_progress':
        this.backendService.inProgress = this.updateTaskArray(this.backendService.inProgress);
        break;
      case 'testing':
        this.backendService.testing = this.updateTaskArray(this.backendService.testing);
        break;
      case 'done':
        this.backendService.done = this.updateTaskArray(this.backendService.done);
        break;
      default:
        break;
    }

  }

  updateTaskArray(arrayToUpdate) {
    const idToUpdate = this.data.id;

    for (let i = 0; i < arrayToUpdate.length; i++) {
      if (arrayToUpdate[i].id === idToUpdate) {
        // Aktualisierung
        arrayToUpdate[i].title = this.taskName;
        arrayToUpdate[i].assigned_to = this.assignedName;

        return arrayToUpdate; // Schleife beenden, da die Aufgabe gefunden und aktualisiert wurde
      }
    }
  }
}
