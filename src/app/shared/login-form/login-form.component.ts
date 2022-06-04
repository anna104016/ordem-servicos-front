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
  createAccountField: boolean = false
  loading: boolean
  
  constructor(
    private readonly router: Router,
    private readonly userService: UserService,
    private readonly formBuilder: FormBuilder,
  ) { 
    this.createAccountField = false
  }

  ngOnInit(): void {
    this.createForm()
  }

  login(){
    this.loading = true
    this.userService.generateToken(this.form.controls.email.value, this.form.controls.password.value)
      .subscribe(response => {
        this.loading = false
        const access_token = response.access_token
        localStorage.setItem('access_token' , access_token )
        this.router.navigate(['/main/dashboard'])
      }, error => {
        this.loading = false
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
  createAccount(){
    this.router.navigate(['create-account'])
    this.createAccountField = true
  }

  saveUser(){
    this.loading = true
    this.userService.create(this.form.getRawValue()).subscribe(resp => {
      this.loading = false
      this.sucesso()
    }, error => {
      this.loading = false
      this.form.reset()
        Swal.fire('Que pena!', 'Não foi possível criar sua conta', 'error').then(res => {
          if(res.isConfirmed){
            Swal.close()
          }
        })
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

  createForm(){
    this.form = this.formBuilder.group({
      email: ['', Validators.email],
      password: ['', Validators.email],
      user_name: ['', Validators.required],
      photo: ['', Validators.required],
    })
  }
}
