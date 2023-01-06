import Swal, { SweetAlertOptions } from 'sweetalert2';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor() {}

  async showSweetAlert(sweetAlertOptions: SweetAlertOptions) {
    return await Swal.fire({
      showConfirmButton: true,
      padding: 40,
      showClass: {
        icon: '', // disable icon animation
      },
      width: 500,
      buttonsStyling: false,
      customClass: {
        cancelButton: 'swal__button swal__button__cancel',
        closeButton: 'swal__button swal__button__close',
        confirmButton: 'swal__button swal__button__confirm',
        title: 'swal__title',
      },
      ...sweetAlertOptions,
    });
  }
}
