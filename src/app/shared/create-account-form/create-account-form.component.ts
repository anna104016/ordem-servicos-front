import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/user/model/user.model';
import { UserService } from 'src/app/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-account-form',
  templateUrl: './create-account-form.component.html',
  styleUrls: ['./create-account-form.component.css']
})
export class CreateAccountFormComponent implements OnInit {

  form: FormGroup

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.createForm(new UserModel())
  }

  home(){
    this.router.navigate([''])
  }

  login(){
    this.router.navigate(['/login'])
  }

  registerNewUser(){
    this.userService.create(this.form.value).subscribe(response => {
      this.successModel()
    }, error => {
      this.errorModel()
    })
  }

  successModel(){
    Swal.fire({
      icon: 'success',
      title: 'Conta criada com sucesso',
      showConfirmButton: true,
      confirmButtonText: 'Fazer login'
    }).then((result) => {
      if(result.isConfirmed){
        this.router.navigate(['/login'])
      }
    })
  }

  errorModel(){
    Swal.fire({
      icon: 'info',
      title: 'Oppss...',
      text: 'Erro ao criar conta, teste novamente.',
      showConfirmButton: true,
      confirmButtonText: 'OK'
    }).then((result) => {
      if(result.isConfirmed){
        this.router.navigate(['/create-account'])
      }
    })
  }

  createForm(user: UserModel){
    this.form = this.formBuilder.group({
      user_name: new FormControl(user.user_name, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255)
      ]),
      email: new FormControl(user.email, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(user.password, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(255)
      ])
    })
  }

}
