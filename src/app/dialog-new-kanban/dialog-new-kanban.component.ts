import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog-new-kanban',
  templateUrl: './dialog-new-kanban.component.html',
  styleUrls: ['./dialog-new-kanban.component.scss']
})
export class DialogNewKanbanComponent {
  kanban = new FormControl('', [Validators.required]);
  
  testArray = [];

  constructor() { }

  getErrorMessage() {
    if (this.kanban.hasError('required')) {
      return 'You must enter a value';
    }
    return ''
  }

  saveKanban() {
  
  }
}
