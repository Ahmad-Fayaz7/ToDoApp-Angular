import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';

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
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'todo-app-angular';
  tasks = [
    { description: 'Buy grocery', createdAt: '8/10/2024', isCompleted: false },
    {
      description: 'Check your emails',
      createdAt: '8/10/2024',
      isCompleted: false,
    },
    { description: 'Eat breakfast', createdAt: '8/10/2024', isCompleted: true },
  ];
}
