import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BackendService } from '../services/backend-service';
import { DialogRef } from '@angular/cdk/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-new-kanban',
  templateUrl: './dialog-new-kanban.component.html',
  styleUrls: ['./dialog-new-kanban.component.scss']
})
export class DialogNewKanbanComponent {
  kanban = new FormControl('', [Validators.required]);
  
  constructor(
    private backendService: BackendService,
    private dialogRef: MatDialogRef<DialogNewKanbanComponent>,
  ) { }

  /**
   * error message for form field
   * 
   * @returns {string} - error message
   */
  getErrorMessage() {
    if (this.kanban.hasError('required')) {
      return 'You must enter a value';
    }
    return ''
  }

  /**
   * save a new kanban channel 
   * 
   */
  async saveKanban() {
    try {
      let resp:any = await this.backendService.addKanbanChannel(this.kanban.value);
      this.backendService.kanbanChannels = resp;
      this.dialogRef.close();
    } catch (error) {
      console.log('Error when create new Channel', error);
    }
  
  }
}
