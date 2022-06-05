import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ErrorsType } from 'src/app/models/error.enum';
import { Photo } from 'src/app/models/user.model';
import { UserService } from 'src/app/user/user.service';
import Swal from 'sweetalert2';
import { SelectUserPhotoComponent } from '../select-user-photo/select-user-photo.component';

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
  imgSelect: string

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  
  constructor(
    private readonly router: Router,
    private readonly userService: UserService,
    private readonly formBuilder: FormBuilder,
    private readonly dialog: MatDialog,
    private readonly _snackBar: MatSnackBar
  ) { 
    this.createAccountField = false
  }

  ngOnInit(): void {
    this.formLogin()
  }

  selectPhoto(){
    this.dialog.open(SelectUserPhotoComponent,  {
        width: '30rem',
        height: '90vh'
      }).afterClosed().subscribe(res => {
        if(res){
          this.form.get('photo').setValue(res.data)
        }else{
          this.form.get('photo').setValue('')
        }
      })
  }

  login(){
    this.loading = true
    if(this.form.invalid){
      this.loading = false
      this.openSnackBar('Informe os dados corretamente',  'OK')
      return
    }
    this.userService.generateToken(this.form.controls.email.value, this.form.controls.password.value)
      .subscribe(response => {
        this.loading = false
        this.form.reset()
        const access_token = response.access_token
        localStorage.setItem('access_token' , access_token )
        this.router.navigate(['/main/dashboard'])
      }, error => {
        this.form.reset()
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
    this.newAccountForm()
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  saveUser(){
    this.loading = true
    if(this.form.invalid){
      this.loading = false
      this.openSnackBar('Informe os dados corretamente',  'OK')
      return
    }
    if(!this.form.get('photo').value) this.form.get('photo').setValue('https://services-on.netlify.app/assets/user-default.png')
    const data = this.form.value
    this.userService.create(data).subscribe(resp => {
      this.loading = false
      this.form.reset()
      this.sucesso()
    }, error => {
      this.loading = false

      if(error.error.error === ErrorsType.EMAIL_ALREADY_REGISTERED) {
        this.openSnackBar('Email já cadastrado', 'OK')
      }else{
        this.form.reset()
          Swal.fire('Que pena!', 'Não foi possível criar sua conta', 'error').then(res => {
            if(res.isConfirmed){
              Swal.close()
            }
          })
      }
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

  formLogin(){
    this.form = this.formBuilder.group({
      email: new FormControl('', [
        Validators.required, Validators.email
      ]),
      password: new FormControl('', [
        Validators.required, Validators.minLength(5), Validators.maxLength(255)
      ])
    })
  }

  newAccountForm(){
    this.form = this.formBuilder.group({
      email: new FormControl('', [
        Validators.required, Validators.email
      ]),
      password: new FormControl('', [
        Validators.required, Validators.minLength(5), Validators.maxLength(255)
      ]),
      user_name: new FormControl('', [
        Validators.required, Validators.minLength(5), Validators.maxLength(255)
      ]),
      photo: new FormControl('')
    })
  }
}
