import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogNewTaskComponent } from '../dialog-new-task/dialog-new-task.component';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BackendService } from '../services/backend-service';
import { TaskDetailComponent } from '../task-detail/task-detail.component';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.scss']
})
export class KanbanBoardComponent implements OnInit {
  @ViewChild('tooltip') tooltip:ElementRef ;
 
  constructor(
    public dialog:MatDialog,
    public router: Router,
    private route:ActivatedRoute,
    public backendService: BackendService,
    ) { }

  ngOnInit(): void {
    this.backendService.loadKanbanChannels();
  }

  /**
   * drag and drop system and move it to the new array
   * 
   * @param event 
   */
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
        
      );
    }
    
    this.updateCategory(this.backendService.todo, 'to_do');
    this.updateCategory(this.backendService.inProgress, 'in_progress');
    this.updateCategory(this.backendService.testing, 'testing');
    this.updateCategory(this.backendService.done, 'done');

    console.log(this.backendService.todo);
  }

  /**
   * update the category in the arrays after they are moved
   * 
   * @param array {array} - which array to be updated
   * @param category {string} - which category should be
   */
  updateCategory(array, category) {
    for (let task of array) {
      if (task.category !== category) {
        task.category = category ;
      }
    }
  }

  /**
   * open dialog to create new task and give die current channel id
   * after closed go back to the right route 
   * 
   */
  openDialogNewTask() {
    const currentChannelId = this.route.snapshot.paramMap.get('channelId');
    
    this.router.navigate([`/board/${currentChannelId}/add_task`]).then(() => {
      const dialogRef =  this.dialog.open(DialogNewTaskComponent, {data : {currentChannelId : currentChannelId}});

      dialogRef.afterClosed().subscribe(() => {
        this.router.navigate([`/board/${currentChannelId}`]);
      });
    });
  }

  /**
   * save the current categorys of the tasks
   * 
   */
  async saveCurrentState() {
    const currentChannelId = this.route.snapshot.paramMap.get('channelId');

    let resp = await this.backendService.saveTaskStates(currentChannelId);
  }

  editTask(task) {
    const currentChannelId = this.route.snapshot.paramMap.get('channelId');
    const taskID = task.id ;

    this.router.navigate([`/board/${currentChannelId}/task/${taskID}`]).then(() => {
      const dialogRef =  this.dialog.open(TaskDetailComponent, {data : task});

      dialogRef.afterClosed().subscribe(() => {
        this.router.navigate([`/board/${currentChannelId}`]);
      });
    });
  }

  deleteTask(task) {
    
  }
}
