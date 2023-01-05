import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { take } from 'rxjs/operators';
import { Notify } from 'notiflix';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/auth/auth.service';
import { SelectUserPhotoComponent } from 'src/app/shared/select-user-photo/select-user-photo.component';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  userDefaultProfilePhoto: string =
    'https://services-on.netlify.app/assets/user-default.png';

  form: FormGroup;
  emailOrPassWrong: string;
  createAccountField: boolean = false;
  loading: boolean;
  imgSelect: string;

  constructor(
    private readonly _router: Router,
    private readonly _userService: UserService,
    private readonly _formBuilder: FormBuilder,
    private readonly _dialog: MatDialog,
    private readonly _authService: AuthService
  ) {}

  ngOnInit(): void {
    this.formLogin();
  }

  selectPhoto() {
    this._dialog
      .open(SelectUserPhotoComponent, {
        width: '30rem',
        height: '90vh'
      })
      .afterClosed()
      .pipe(take(1))
      .subscribe((res) => {
        if (res) {
          this.form.get('photo').setValue(res.data);
        } else {
          this.form.get('photo').setValue('');
        }
      });
  }

  login() {
    this.loading = true;
    if (this.form.invalid) {
      this.loading = false;
      Notify.info('Informe os dados corretamente');
      return;
    }

    const body = this.createUserObject();

    this._authService
      .loginByCredentials(body)
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          this.successfullyAuthenticatedUser(response);
        },
        error: () => {
          this.unauthenticatedUser();
        }
      });
  }

  createUserObject() {
    const credentails = {
      email: this.form.controls.email.value,
      password: this.form.controls.password.value
    };

    return credentails;
  }

  unauthenticatedUser() {
    this.form.reset();
    this.loading = false;
    Swal.fire({
      icon: 'warning',
      text: 'Email e/ou senha invalido(s)!',
      title: 'Atenção!'
    });
  }

  successfullyAuthenticatedUser(user: UserModel) {
    this.loading = false;
    this._authService.changeUser(user);
    this.form.reset();
    const access_token = user.access_token;
    localStorage.setItem('access_token', access_token);
    this._router.navigate(['/portal/dashboard']);
  }

  createAccount() {
    this._router.navigate(['create-account']);
    this.createAccountField = true;
    this.newAccountForm();
  }

  saveUser() {
    this.loading = true;
    if (this.form.invalid) {
      this.loading = false;
      Notify.info('Informe os dados corretamente');
      return;
    }
    if (!this.form.get('photo').value)
      this.form.get('photo').setValue(this.userDefaultProfilePhoto);
    const data = this.form.value;
    this._userService
      .create(data)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.loading = false;
          this.form.reset();
          this.sucesso();
        },
        error: (error) => {
          this.loading = false;
          this.form.reset();
          Swal.fire('Que pena!', error.error.message, 'error').then((res) => {
            if (res.isConfirmed) {
              Swal.close();
            }
          });
        }
      });
  }

  sucesso() {
    Swal.fire({
      title: 'Sucesso!',
      text: 'Conta criada com sucesso',
      icon: 'success',
      showConfirmButton: true
    }).then((res) => {
      if (res.isConfirmed) {
        this._router.navigate(['/login']);
      }
    });
  }

  formLogin() {
    this.form = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(255)
        ]
      ]
    });
  }

  newAccountForm() {
    this.form = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(255)
        ]
      ],
      user_name: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(255)
        ]
      ],
      occupation_area: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(255)
        ]
      ],
      photo: ['']
    });
  }
}
