import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { taskCreationDto, taskDto } from './task.models';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  apiUrl = 'https://localhost:7220';
  constructor(private http: HttpClient) {}

  get(): Observable<any> {
    return this.http.get<taskDto[]>(this.apiUrl + '/api/tasks');
  }

  create(taskCreationDto: taskCreationDto) {
    console.log(taskCreationDto.description);
    return this.http.post(`${this.apiUrl}/api/tasks`, taskCreationDto);
  }
}
