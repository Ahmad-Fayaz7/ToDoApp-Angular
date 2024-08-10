import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TaskService } from './task.service';
import { taskCreationDto, taskDto } from './task.models';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatFormField,
    MatLabel,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatCheckboxModule,
    ReactiveFormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(
    private taskService: TaskService,
    private formBuilder: FormBuilder
  ) {}
  title = 'todo-app-angular';
  tasks: taskDto[] = [];
  task: taskCreationDto = { description: 'abcd', isCompleted: false };
  taskForm!: FormGroup;
  ngOnInit() {
    this.taskForm = this.formBuilder.group({
      description: ['', Validators.required],
    });
    this.taskService.get().subscribe((response) => {
      this.tasks = response;
    });
  }

  add() {
    this.task.description = this.taskForm.get('description')?.value;
    console.log(this.task);
    this.taskService.create(this.task).subscribe(() => {});
  }
}
