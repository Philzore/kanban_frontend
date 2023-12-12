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

  openKanban(channelId) {
    this.router.navigate(['/board',channelId]);
    // this.router.navigateByUrl('board');
  }

  openDialogNewKanban() {
    

    this.router.navigate(['/board/create_channel']).then(() => {
      const dialogRef =  this.dialog.open(DialogNewKanbanComponent);

      dialogRef.afterClosed().subscribe(() => {
        this.router.navigate(['/board']);
      });
    });
  }

  toggleHeart() {
    this.activateHeart = !this.activateHeart;
  }
}
