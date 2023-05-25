import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { TaskDetail } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  allTasks = [
    {
      id: 1,
      title: 'Do Homework',
      isChecked: false,
      description: 'Do Homework',
      dueDate: '2023-12-12',
      piority: 'normal',
      isDetail: false,
    },
    {
      id: 2,
      title: 'Play Soccer',
      isChecked: false,
      description: 'Play Soccer',
      dueDate: '2023-12-08',
      piority: 'high',
      isDetail: false,
    },
    {
      id: 3,
      title: 'Listen Music',
      isChecked: false,
      description: 'Listen Music',
      dueDate: '2023-12-09',
      piority: 'low',
      isDetail: false,
    },
  ];

  constructor() {}

  getAllTasks() {
    return of(this.allTasks);
  }

  addNewTask(newTask: TaskDetail) {
    this.allTasks = [...this.allTasks, newTask];
    return of(this.allTasks);
  }

  updateTaskDetail(task: TaskDetail) {
    let findIndex = this.allTasks.findIndex((item) => item.id === task.id);
    this.allTasks[findIndex] = task;
    return of(this.allTasks);
  }

  removeTaskChecked(newTaskList: TaskDetail[]) {
    newTaskList = newTaskList.filter((item) => item.isChecked === false);
    this.allTasks = newTaskList;
    return of(this.allTasks);
  }
}
