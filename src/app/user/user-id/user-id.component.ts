import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ResUserResolve, UserModel} from '../../models/user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-id',
  templateUrl: './user-id.component.html',
  styleUrls: ['./user-id.component.css']
})
export class UserIdComponent implements OnInit {

  user: UserModel;
  subscription: Subscription
  userPhoto: string = 'https://licitacao.fundacaouniselva.org.br/Perfil/Foto'

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly userService:UserService
  ) { }

  ngOnInit(): void {
    this.userAccount()
  }

  userAccount(): void{
    this.userService.finduser().subscribe(resp => {
      this.user = resp
    })
  }
}
