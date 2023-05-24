import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';

@NgModule({
  declarations: [AppComponent, CreateTaskComponent, TaskDetailComponent],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
