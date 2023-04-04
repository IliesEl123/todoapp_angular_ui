import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoRoutingModule } from './todo-routing.module';
import { TodoListComponent } from './todo-list/todo-list.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [TodoListComponent],
  imports: [CommonModule, TodoRoutingModule, FormsModule],
  exports: [TodoListComponent],
})
export class TodoModule {}
