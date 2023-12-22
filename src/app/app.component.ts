import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
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
    private route: ActivatedRoute,
  ) { }

  async ngOnInit() {
    let channelId = localStorage.getItem('channel')

    if (channelId) {
      this.openKanban(channelId);
    }
  }

  async openKanban(channelId) {
    localStorage.setItem('channel', channelId);
    this.router.navigate(['/board', channelId]);

    let resp: any = await this.backendService.getTasksFromSingleChannel(channelId);

    this.backendService.todo = [];
    this.backendService.inProgress = [];
    this.backendService.testing = [];
    this.backendService.done = [];


    for (let task of resp) {
      if (task.category == 'to_do') {
        this.backendService.todo.push(task);
      } else if (task.category == 'in_progress') {
        this.backendService.inProgress.push(task);
      } else if (task.category == 'testing') {
        this.backendService.testing.push(task);
      } else if (task.category == 'done') {
        this.backendService.done.push(task);
      }
    }
    this.backendService.currentActiveChannel = channelId ;
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
    this.backendService.currentUser = '';
    this.backendService.currentActiveChannel = 0 ;
  }

  async deleteChannel(channelId) {
   
    let resp = await this.backendService.deleteChannel(channelId) ;

    this.backendService.kanbanChannels = resp ;

    if (channelId == this.backendService.currentActiveChannel) {
      this.router.navigateByUrl('/board');
      this.backendService.currentActiveChannel = 0 ;
    }
  }
}
