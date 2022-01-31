import { Component, OnInit } from '@angular/core';
import { UserModel } from '../model/user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-id',
  templateUrl: './user-id.component.html',
  styleUrls: ['./user-id.component.css']
})
export class UserIdComponent implements OnInit {

  user: UserModel = new UserModel()

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.findMyAccount()
  }

  findMyAccount(){
    this.userService.finduser().subscribe(
      response => {
        this.user = response
      }
    )
  }

}
