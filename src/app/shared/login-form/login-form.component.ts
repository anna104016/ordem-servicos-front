import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/user/model/user.model';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  form: FormGroup
  emailOrPassWrong:string

  constructor(
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createForm(new UserModel())
  }

  login(){
    this.userService.generateToken(this.form.controls.email.value, this.form.controls.password.value)
      .subscribe(response => {
        const access_token = response.access_token
        localStorage.setItem('access_token' , access_token )
        this.router.navigate(['/main/dashboard'])
      }, error => {
        this.validateUser()
      })
  }

  validateUser(){
    this.emailOrPassWrong = 'Email e/ou senha incorretos'
    this.form.reset()
    setTimeout(() => { 
      this.emailOrPassWrong = '' 
    },5000);

  }

  home(){
    this.router.navigate([''])
  }

  createAccount(){
    this.router.navigate(['create-account'])
  }


  createForm(user: UserModel){
    this.form = this.formBuilder.group({
      email: new FormControl(user.email, [
        Validators.required
      ]),
      password: new FormControl(user.password, [
        Validators.required
      ])
    })
  }

}
