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
      this.sortListTasks(this.allTasks);
    });
  }

  handleAddNewTask(newTask: TaskDetail) {
    newTask.id = this.allTasks.length + 1;
    this.taskService.addNewTask(newTask).subscribe((value: TaskDetail[]) => {
      this.successMessage('Add a new task successfull!');
      this.allTasks = value;
      this.sortListTasks(this.allTasks);
    });
  }

  handleRemoveTasksChecked(tasks: TaskDetail[]) {
    if (confirm('Do you want to remove task(s)?') === true) {
      this.taskService
        .removeTaskChecked(tasks)
        .subscribe((value: TaskDetail[]) => {
          this.allTasks = value;
          this.sortListTasks(this.allTasks);
          this.successMessage('Remove task(s) successfull!');
        });
    } else {
      this.allTasks.map((item) => (item.isChecked = false));
    }
  }

  handleUpdateTask(task: TaskDetail) {
    this.taskService.updateTaskDetail(task).subscribe((value: TaskDetail[]) => {
      this.successMessage('Update task successfull!');
      this.allTasks = value;
      this.sortListTasks(this.allTasks);
    });
  }

  sortListTasks(allTasks: TaskDetail[]) {
    this.allTasks = allTasks.sort((a: TaskDetail, b: TaskDetail) => {
      if (a.dueDate < b.dueDate) {
        return -1;
      }

      if (a.dueDate > b.dueDate) {
        return 1;
      }

      return 0;
    });
  }

  successMessage(msg: string) {
    alert(msg);
  }
}
