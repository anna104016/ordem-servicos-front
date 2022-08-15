import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {ErrorsType} from 'src/app/models/error.enum';
import {UserService} from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import {SelectUserPhotoComponent} from '../select-user-photo/select-user-photo.component';
import {take} from "rxjs/operators";
import {Notify} from "notiflix";

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

    form: FormGroup
    emailOrPassWrong: string
    createAccountField: boolean = false
    loading: boolean
    imgSelect: string

    constructor(
        private readonly router: Router,
        private readonly userService: UserService,
        private readonly formBuilder: FormBuilder,
        private readonly dialog: MatDialog,
    ) {
        this.createAccountField = false
    }

    ngOnInit(): void {
        this.formLogin()
    }

    selectPhoto() {
        this.dialog.open(SelectUserPhotoComponent, {
            width: '30rem',
            height: '90vh'
        }).afterClosed().pipe(take(1)).subscribe(res => {
            if (res) {
                this.form.get('photo').setValue(res.data)
            } else {
                this.form.get('photo').setValue('')
            }
        })
    }

    login() {
        this.loading = true
        if (this.form.invalid) {
            this.loading = false
            Notify.info('Informe os dados corretamente')
            return
        }

        const body = {
            email: this.form.controls.email.value,
            password: this.form.controls.password.value
        }
        this.userService.generateToken(body)
            .pipe(take(1)).subscribe({
            next: (response) => {
                this.loading = false
                this.form.reset()
                const access_token = response.access_token
                localStorage.setItem('access_token', access_token)
                this.router.navigate(['/portal/dashboard'])
            },
            error: () => {
                this.form.reset()
                this.loading = false
                Swal.fire({
                    icon: "warning",
                    text: "Email e/ou senha invalido(s)!",
                    title: "Atenção!"
                })
            }
        })
    }

    createAccount() {
        this.router.navigate(['create-account'])
        this.createAccountField = true
        this.newAccountForm()
    }

    saveUser() {
        this.loading = true
        if (this.form.invalid) {
            this.loading = false
            Notify.info("Informe os dados corretamente")
            return
        }
        if (!this.form.get('photo').value) this.form.get('photo').setValue('https://services-on.netlify.app/assets/user-default.png')
        const data = this.form.value
        this.userService.create(data)
            .pipe(take(1))
            .subscribe({
                next: () => {
                    this.loading = false
                    this.form.reset()
                    this.sucesso()
                },
                error: (error) => {
                    this.loading = false

                    if (error.error.error === ErrorsType.EMAIL_ALREADY_REGISTERED) {
                        Notify.info("Email já cadastrado")
                    } else {
                        this.form.reset()
                        Swal.fire('Que pena!', 'Não foi possível criar sua conta', 'error').then(res => {
                            if (res.isConfirmed) {
                                Swal.close()
                            }
                        })
                    }
                }
            })
    }

    sucesso() {
        Swal.fire({
            title: 'Sucesso!',
            text: 'Conta criada com sucesso',
            icon: 'success',
            showConfirmButton: true,
        }).then(res => {
            if (res.isConfirmed) {
                this.router.navigate(['/login'])
            }
        })
    }

    formLogin() {
        this.form = this.formBuilder.group({
            email: new FormControl('', [
                Validators.required, Validators.email
            ]),
            password: new FormControl('', [
                Validators.required, Validators.minLength(5), Validators.maxLength(255)
            ])
        })
    }

    newAccountForm() {
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
            occupation_area: new FormControl('', [
                Validators.required, Validators.minLength(5), Validators.maxLength(255)
            ]),
            photo: new FormControl('')
        })
    }
}
