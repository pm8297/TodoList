import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TaskDetail } from '../models/task.model';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss'],
})
export class TaskDetailComponent implements OnInit {
  @Input() allTasks!: TaskDetail[];
  @Output() handleRemoveTasksChecked = new EventEmitter();
  @Output() handleUpdateTask = new EventEmitter();

  detailTaskForm!: FormGroup;
  filteredTaskList!: TaskDetail[];
  isBulkAction = false;

  constructor(private fb: FormBuilder) {}

  ngOnChanges(): void {
    this.filteredTaskList = this.allTasks;
  }

  ngOnInit(): void {
    this.initDetailTaskForm();
  }

  initDetailTaskForm() {
    this.detailTaskForm = this.fb.group({
      search: [''],
    });
  }

  onSearchTask() {
    let searchValue = this.detailTaskForm.controls['search'].value;
    if (!searchValue) {
      this.filteredTaskList = this.allTasks;
      this.filteredTaskList.map((item) => (item.isDetail = false));
    }
    this.filteredTaskList = this.allTasks.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    );
  }

  showDetail(i: number) {
    this.filteredTaskList[i].isDetail = !this.filteredTaskList[i].isDetail;
  }

  onRemove(i: number) {
    if (confirm('Do you want to remove this task?') === true) {
      this.filteredTaskList.splice(i, 1);
      this.isBulkAction = false;
      alert('Remove task successfull!');
    } else {
      return;
    }
  }

  onRemoveTasksChecked() {
    this.handleRemoveTasksChecked.emit(this.filteredTaskList);
    this.isBulkAction = false;
  }

  onChangeChecked(event: Event, i: number) {
    this.filteredTaskList[i].isChecked = (
      event.target as HTMLInputElement
    ).checked;

    if (this.filteredTaskList.every((item) => item.isChecked === false)) {
      this.isBulkAction = false;
    } else {
      this.isBulkAction = true;
    }
  }

  onUpdateTask(event: Event) {
    this.filteredTaskList.map((item) => (item.isDetail = false));
    this.handleUpdateTask.emit(event);
  }
}
