import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogNewTaskComponent } from '../dialog-new-task/dialog-new-task.component';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.scss']
})
export class KanbanBoardComponent implements OnInit {
  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  inProgress = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  testing = ['saufen'];

  done = ['einkaufen'];

  

  constructor(
    public dialog:MatDialog,
    public router: Router,
    
    ) { }

  ngOnInit(): void {
    
  }

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
  }

  openDialogNewTask() {
    this.router.navigate(['/board/1/add_task']).then(() => {
      const dialogRef =  this.dialog.open(DialogNewTaskComponent);

      dialogRef.afterClosed().subscribe(() => {
        this.router.navigate(['/board/1']);
      });
    });
  }
}
