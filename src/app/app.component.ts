import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogNewKanbanComponent } from './dialog-new-kanban/dialog-new-kanban.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  opened: boolean;
  activateHeart: boolean = false;

  constructor(
    private router: Router,
    private dialog: MatDialog,
  ) { }

  openKanban() {
    this.router.navigateByUrl('board');
  }

  openDialogNewKanban() {
    this.dialog.open(DialogNewKanbanComponent);
  }

  toggleHeart() {
    this.activateHeart = !this.activateHeart;
  }
}
