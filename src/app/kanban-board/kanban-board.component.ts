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
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorSnackbarComponent } from '../error-snackbar/error-snackbar.component';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.scss']
})
export class KanbanBoardComponent implements OnInit {
  @ViewChild('tooltip') tooltip:ElementRef ;

  durationInSeconds = 3;

 
  constructor(
    public dialog:MatDialog,
    public router: Router,
    private route:ActivatedRoute,
    public backendService: BackendService,
    private _snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.backendService.loadKanbanChannels();
  }

  openSnackBar() {
    this._snackBar.openFromComponent(ErrorSnackbarComponent, {
      duration: this.durationInSeconds * 1000,
    });
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

    this.saveCurrentState() ;
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

  async deleteTask(task) {
    
    let resp = await this.backendService.deleteSingleTask(task.id) ;

    if (resp['success'] == true) {
      this.findTaskArray(task)
    } else {
      this.openSnackBar() ;
    }
  }

  findTaskArray(task) {
    switch (task.category) {
      case 'to_do':
        this.backendService.todo = this.updateTaskArray(this.backendService.todo, task.id) ;
        break;
      case 'in_progress':
        this.backendService.inProgress = this.updateTaskArray(this.backendService.inProgress, task.id) ;
        break;
      case 'testing':
        this.backendService.testing = this.updateTaskArray(this.backendService.testing, task.id) ;
        break;
      case 'done':
        this.backendService.done = this.updateTaskArray(this.backendService.done, task.id) ;
        break;
      default:
        break;
    }
    
  }

  updateTaskArray(arrayToUpdate, taskID) {
    const idToDelete = taskID;

    for (let i = 0; i < arrayToUpdate.length; i++) {
      if (arrayToUpdate[i].id === idToDelete) {
        // löschen 
        arrayToUpdate.splice(i,1) ;
      
        return arrayToUpdate; // Schleife beenden, da die Aufgabe gefunden und aktualisiert wurde
      }
    }
  }
}
