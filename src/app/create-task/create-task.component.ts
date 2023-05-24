import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskDetail } from '../models/task.model';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
})
export class CreateTaskComponent implements OnInit {
  @Input() isDetail = false;
  @Input() taskDetail!: TaskDetail;
  @Input() index!: number;
  @Output() handleAddNewTask = new EventEmitter();
  @Output() handleUpdateTask = new EventEmitter();

  isSubmitted = false;
  createTaskForm!: FormGroup;
  piorityList = [
    { value: 'low', label: 'Low' },
    { value: 'normal', label: 'Normal' },
    { value: 'high', label: 'High' },
  ];

  piorityDefault = 'normal';
  dateDefault = new Date();
  dueDateDefault = '';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.getDueDateDefault();
    this.initCreateTaskForm(this.taskDetail);
  }

  getDueDateDefault() {
    let day =
      this.dateDefault.getDate().toString().length === 1
        ? `0${this.dateDefault.getDate()}`
        : this.dateDefault.getDate();

    let month =
      this.dateDefault.getMonth().toString().length === 1
        ? `0${this.dateDefault.getMonth() + 1}`
        : this.dateDefault.getMonth() + 1;

    let year = this.dateDefault.getFullYear();

    this.dueDateDefault = `${year}-${month}-${day}`;

    return this.dueDateDefault;
  }

  initCreateTaskForm(taskDetail: TaskDetail) {
    this.createTaskForm = this.fb.group({
      title: [taskDetail?.title ? taskDetail.title : '', Validators.required],
      description: [taskDetail?.description ? taskDetail.description : ''],
      dueDate: [taskDetail?.dueDate ? taskDetail.dueDate : this.dueDateDefault],
      piority: [taskDetail?.piority ? taskDetail.piority : 'normal'],
      isChecked: false,
      isDetail: false,
      id: [taskDetail?.id ? taskDetail.id : null],
    });
  }

  onAddNewTask() {
    this.isSubmitted = true;

    if (this.createTaskForm.invalid) {
      return;
    }

    let formValue = {
      title: this.createTaskForm.controls['title'].value,
      description: this.createTaskForm.controls['description'].value,
      dueDate: this.createTaskForm.controls['dueDate'].value,
      piority: this.createTaskForm.controls['piority'].value,
      isChecked: false,
      isDetail: false,
    };

    this.handleAddNewTask.emit(formValue);
    this.isSubmitted = false;
    this.createTaskForm.controls['title'].setValue('');
    this.createTaskForm.controls['description'].setValue('');
    this.createTaskForm.controls['dueDate'].setValue(this.dueDateDefault);
    this.createTaskForm.controls['piority'].setValue('normal');
  }

  onUpdateTask() {
    this.isSubmitted = true;

    if (this.createTaskForm.invalid) {
      return;
    }

    let formValue = {
      title: this.createTaskForm.controls['title'].value,
      description: this.createTaskForm.controls['description'].value,
      dueDate: this.createTaskForm.controls['dueDate'].value,
      piority: this.createTaskForm.controls['piority'].value,
      isChecked: false,
      isDetail: false,
      id: this.createTaskForm.controls['id'].value,
    };

    this.handleUpdateTask.emit(formValue);
    this.isSubmitted = false;
  }

  get f() {
    return this.createTaskForm.controls;
  }
}
