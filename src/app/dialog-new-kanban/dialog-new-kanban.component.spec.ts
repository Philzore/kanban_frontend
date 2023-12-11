import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNewKanbanComponent } from './dialog-new-kanban.component';

describe('DialogNewKanbanComponent', () => {
  let component: DialogNewKanbanComponent;
  let fixture: ComponentFixture<DialogNewKanbanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogNewKanbanComponent]
    });
    fixture = TestBed.createComponent(DialogNewKanbanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
