import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {SafeStyle, DomSanitizer} from '@angular/platform-browser';
import {NgxSpinnerService} from 'ngx-spinner';
import {take} from 'rxjs/operators';
import {SelectUserPhotoComponent} from 'src/app/shared/select-user-photo/select-user-photo.component';
import {UserModel} from '../../models/user.model';
import {UserService} from '../../services/user.service';
import {Notify} from "notiflix";

@Component({
    selector: 'app-user-id',
    templateUrl: './user-id.component.html',
    styleUrls: ['./user-id.component.css']
})
export class UserIdComponent implements OnInit {

    user: UserModel;
    backgroundImg: SafeStyle;

    constructor(
        private readonly userService: UserService,
        private readonly spinner: NgxSpinnerService,
        private readonly sanitizer: DomSanitizer,
        private readonly dialog: MatDialog,
    ) {
    }

    ngOnInit(): void {
        this.userAccount()
    }

    userAccount(): void {
        this.userService.finduser()
            .pipe(take(1))
            .subscribe(
                {
                    next: (resp) => {
                        this.user = resp
                        this.backgroundImg = this.sanitizer.bypassSecurityTrustStyle('url(' + this.user.photo + ')');
                    },
                })
    }

    selectPhoto() {
        const photo = this.dialog.open(SelectUserPhotoComponent, {
            width: '40rem',
            height: '90vh'
        })
        photo.afterClosed().pipe(take(1)).subscribe(resp => {
            if (resp) {
                this.updateUserPhoto(resp.data)
            }
        })
    }

    updateUserPhoto(data) {
        const body = {
            photo: data
        }
        this.userService.updatePhoto(this.user.user_id, body).pipe(take(1)).subscribe({
            next: (resp: UserModel) => {
                this.user.photo = resp.photo
                Notify.success("Foto atualizada com sucesso")
                this.refreshPhoto(resp.photo)
            }, error: () => {
                Notify.failure("Foto não atualizada")
            }
        })
    }

    refreshPhoto(photo: string) {
        this.backgroundImg = this.sanitizer.bypassSecurityTrustStyle('url(' + photo + ')');
    }
}
