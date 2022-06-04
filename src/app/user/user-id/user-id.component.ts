import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ResUserResolve, UserModel} from '../../models/user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-id',
  templateUrl: './user-id.component.html',
  styleUrls: ['./user-id.component.css']
})
export class UserIdComponent implements OnInit {

  user: UserModel;

  constructor(
    private readonly userService:UserService,
    private readonly spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.userAccount()
  }

  userAccount(): void{
    this.spinner.show()
    this.userService.finduser().pipe(
      finalize(() =>  this.spinner.hide())
    ).subscribe(resp => {
      this.user = resp
    })
  }
}
