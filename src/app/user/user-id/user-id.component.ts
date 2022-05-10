import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ResUserResolve, UserModel } from '../../models/user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-id',
  templateUrl: './user-id.component.html',
  styleUrls: ['./user-id.component.css']
})
export class UserIdComponent implements OnInit {

  user: UserModel;
  subscription: Subscription

  constructor(
    private readonly activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.userAccount()
  }

  userAccount(): void{
    this.subscription = this.activatedRoute.data.subscribe((data: ResUserResolve) => {
      this.user = data.user
    })
  }
}
