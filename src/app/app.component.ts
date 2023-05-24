import { Component } from '@angular/core';
import { TaskDetail } from './models/task.model';
import { TaskService } from './services/task-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'todo-list';
  allTasks!: TaskDetail[];

  constructor(private taskService: TaskService) {
    this.taskService.getAllTasks().subscribe((value: TaskDetail[]) => {
      this.allTasks = value;
    });
  }

  handleAddNewTask(newTask: TaskDetail) {
    newTask.id = this.allTasks.length + 1;
    this.taskService.addNewTask(newTask).subscribe((value: TaskDetail[]) => {
      this.allTasks = value;
    });
  }

  handleRemoveTasksChecked(tasks: TaskDetail[]) {
    this.taskService
      .removeTaskChecked(tasks)
      .subscribe((value: TaskDetail[]) => {
        this.allTasks = value;
      });
  }

  handleUpdateTask(task: TaskDetail) {
    this.taskService.updateTaskDetail(task).subscribe((value: TaskDetail[]) => {
      this.allTasks = value;
    });
  }

  sortListTasks(allTasks: TaskDetail[]) {}
}
