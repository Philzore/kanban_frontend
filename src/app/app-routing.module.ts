import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { KanbanBoardComponent } from './kanban-board/kanban-board.component';
import { DialogNewTaskComponent } from './dialog-new-task/dialog-new-task.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { DialogNewKanbanComponent } from './dialog-new-kanban/dialog-new-kanban.component';

const routes: Routes = [
  {path: '' , component: LoginComponent},
  {path: 'register' , component: RegisterComponent},
  {path: 'board' , component: KanbanBoardComponent, children : [{path : 'create_channel', component: DialogNewKanbanComponent}]},
  {path: 'board/:channelId' , component: KanbanBoardComponent , children : [{path : 'add_task', component: DialogNewTaskComponent}]},
  {path: 'board/:channelId/task/:taskId' , component: TaskDetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
