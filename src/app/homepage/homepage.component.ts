import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SweetAlertService } from '../sweet-alert.service';
import { taskDto, taskCreationDto } from '../task.models';
import { TaskService } from '../task.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterOutlet } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../auth.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-homepage',
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
    SweetAlert2Module,
    MatIconModule,
    MatToolbarModule,
    MatPaginatorModule,
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent {
  constructor(
    private taskService: TaskService,
    private formBuilder: FormBuilder,
    private sweetAlert: SweetAlertService,
    private authService: AuthService
  ) {}
  title = 'todo-app-angular';
  tasks: taskDto[] = [];
  task: taskCreationDto = { description: 'abcd', isCompleted: false };
  taskForm!: FormGroup;
  totalAmountOfRecords!: string;
  currentPage = 1;
  pageSize = 5;
  ngOnInit() {
    this.taskForm = this.formBuilder.group({
      description: ['', Validators.required],
    });
    this.loadTasks();
  }

  loadTasks() {
    this.taskService
      .get(this.currentPage, this.pageSize)
      .subscribe((response) => {
        this.tasks = response.taskDto;
        this.totalAmountOfRecords = response.totalRecords;
      });
  }

  // Add task
  add() {
    if (this.taskForm.valid) {
      this.task.description = this.taskForm.get('description')?.value;
      this.taskService.create(this.task).subscribe(() => {
        this.loadTasks();
        //this.taskForm.get('description')?.setValue('');
        this.taskForm.reset();
        // Reset the validation state of the field
        this.taskForm.get('description')?.markAsPristine();
        this.taskForm.get('description')?.markAsUntouched();
        // this.taskForm.get('description')?.touched;

        this.taskForm.get('description')?.updateValueAndValidity();
      });
    }
  }

  // Delete task
  async delete(id: number) {
    const result = await this.sweetAlert.confirm(
      'Are you sure?',
      'You cannot role back this operation!'
    );
    if (result.isConfirmed) {
      this.taskService.delete(id).subscribe(() => {
        this.loadTasks();
      });
    }
  }

  // Complete task
  complete(task: taskDto) {
    task.isCompleted = !task.isCompleted;
    const taskCreationDto = {
      description: task.description,
      isCompleted: task.isCompleted,
    };
    this.taskService.update(task.id, taskCreationDto).subscribe(() => {
      this.loadTasks();
    });
  }

  // Update page
  updatePage(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadTasks();
  }

  // Log out
  logout() {
    this.authService.logout();
  }
}
