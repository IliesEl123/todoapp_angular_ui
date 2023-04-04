import { Component, OnInit } from '@angular/core';
import { TodoService, Task } from '../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  today: Date = new Date();
  tasks: Task[] = [];
  isEmpty: boolean = true;
  modalOpen = false;

  // Fonction pour mettre à jour la variable isEmpty
  updateIsEmpty(event: Event) {
    const target = event.target as HTMLInputElement;
    this.isEmpty = (target.value.trim() ?? '') === '';
  }

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  // Fonction pour charger les tâches depuis le service
  loadTasks(): void {
    this.todoService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  // Fonction pour ajouter une tâche
  addTask(title: string, input: HTMLInputElement): void {
    const newTask: Task = {
      id: 0,
      title: title.trim(),
      isDone: false,
    };

    this.todoService.createTask(newTask).subscribe((createdTask) => {
      this.tasks.push(createdTask);
    });

    this.clearInput(input);
  }

  // Fonction pour supprimer une tâche
  deleteTask(taskId: number): void {
    this.todoService.deleteTask(taskId).subscribe(() => {
      this.loadTasks();
    });
  }

  // Fonction pour ouvrir le modal de confirmation de suppression de toutes les tâches
  deleteAllTask(): void {
    this.modalOpen = true;
  }

  // Fonction pour supprimer toutes les tâches
  deleteAllTasksConfirmed(): void {
    this.todoService.deleteAllTasks().subscribe(() => {
      this.modalOpen = false;
      this.loadTasks();
    });
  }

  // Fonction pour vider l'input d'une tâche après son ajout
  clearInput(input: HTMLInputElement): void {
    input.value = '';
  }
}
