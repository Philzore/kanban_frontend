import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogNewKanbanComponent } from './dialog-new-kanban/dialog-new-kanban.component';
import { environment } from 'src/environments/environment.development';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BackendService } from './services/backend-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  opened: boolean;
  activateHeart: boolean = false;

  

  constructor(
    private router: Router,
    private dialog: MatDialog,
    public backendService: BackendService,
  ) { }

  async ngOnInit() {
  }

  openKanban(channelId) {
    this.router.navigate(['/board', channelId]);
    // this.router.navigateByUrl('board');
  }

  openDialogNewKanban() {
    this.router.navigate(['/board/create_channel']).then(() => {
      const dialogRef = this.dialog.open(DialogNewKanbanComponent);

      dialogRef.afterClosed().subscribe(() => {
        this.router.navigate(['/board']);
      });
    });
  }

  toggleHeart() {
    this.activateHeart = !this.activateHeart;
  }

  logout() {
    this.router.navigate(['/']);
    localStorage.clear();
    this.backendService.currentUser = '' ;
  }

  deleteChannel(channelId) {
    
  }
}
