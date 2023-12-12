import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BackendService } from '../services/backend-service';

@Component({
  selector: 'app-dialog-new-kanban',
  templateUrl: './dialog-new-kanban.component.html',
  styleUrls: ['./dialog-new-kanban.component.scss']
})
export class DialogNewKanbanComponent {
  kanban = new FormControl('', [Validators.required]);
  
  testArray = [];

  constructor(
    private backendService: BackendService,
  ) { }

  getErrorMessage() {
    if (this.kanban.hasError('required')) {
      return 'You must enter a value';
    }
    return ''
  }

  async saveKanban() {
    try {
      let resp:any = await this.backendService.addKanbanChannel(this.kanban.value);
      console.log(resp);
    } catch (error) {
      console.log('Error when create new Channel', error);
    }
  
  }
}
