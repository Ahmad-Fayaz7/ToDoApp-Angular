import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { taskCreationDto, taskDto } from './task.models';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  apiUrl = 'https://localhost:7220/api/tasks';
  constructor(private http: HttpClient) {}

  get(pageIndex: number, pageSize: number): Observable<any> {
    let params = new HttpParams();
    params = params.append('pageIndex', pageIndex.toString());
    params = params.append('pageSize', pageSize.toString());
    return this.http.get<any>(this.apiUrl, { params });
  }

  create(taskCreationDto: taskCreationDto) {
    console.log(taskCreationDto.description);
    return this.http.post(`${this.apiUrl}`, taskCreationDto);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  update(id: number, task: taskCreationDto) {
    return this.http.put(`${this.apiUrl}/${id}`, task);
  }
}
