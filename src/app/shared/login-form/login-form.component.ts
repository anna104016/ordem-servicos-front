import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';
import { UserService } from 'src/app/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  form: FormGroup
  emailOrPassWrong:string
  hide = true;
  createAccountField: boolean

  constructor(
    private readonly router: Router,
    private readonly userService: UserService,
    private readonly formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.createAccountField = false
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
    this.createAccountField = true
    this.router.navigate(['create-account'])
  }

  saveUser(){
    this.userService.create(this.form.getRawValue()).subscribe(resp => {
      this.sucesso()
    })
  }

  sucesso(){
    Swal.fire({
      title: 'Sucesso!',
      text: 'Conta criada com sucesso',
      icon: 'success',
      showConfirmButton: true,
    }).then(res => {
      if(res.isConfirmed){
        this.router.navigate(['/login'])
      }
    })
  }


  createForm(user: UserModel){
    this.form = this.formBuilder.group({
      email: new FormControl(user.email, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(user.password, [
        Validators.required
      ]),
      user_name: new FormControl(user.user_name, [
        Validators.required
      ]),
    })
  }

}
