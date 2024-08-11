// sweet-alert.service.ts
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class SweetAlertService {
  constructor() {}

  success(message: string) {
    Swal.fire('Success', message, 'success');
  }

  error(message: string) {
    Swal.fire('Error', message, 'error');
  }

  confirm(title: string, text: string) {
    return Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    });
  }

  // You can add more methods as per your need.
}
