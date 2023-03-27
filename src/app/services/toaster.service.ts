import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

constructor(private toastr: ToastrService) { }

ActiveToaster(type: string, title: string, message: string) {
  switch (type) {
    case 'success':
      this.toastr.success(message, title, {
        progressAnimation: 'increasing',
        progressBar: true
      });
      break;
    case 'error':
      this.toastr.error(message, title, {
        progressAnimation: 'increasing',
        progressBar: true,
      });
      break;
    default:
      break;
  }
}

}
