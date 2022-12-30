import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  title = 'front';

  constructor(
    private readonly _authService: AuthService
  ){}

  ngOnInit(): void {
    this.getUser()
  }

  getUser(){
    this._authService.validateUser().subscribe()
  }
}
