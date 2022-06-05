import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { SelectUserPhotoComponent } from 'src/app/shared/select-user-photo/select-user-photo.component';
import { ResUserResolve, UserModel} from '../../models/user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-id',
  templateUrl: './user-id.component.html',
  styleUrls: ['./user-id.component.css']
})
export class UserIdComponent implements OnInit {

  user: UserModel;
  backgroundImg: SafeStyle;

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private readonly userService:UserService,
    private readonly spinner: NgxSpinnerService,
    private readonly sanitizer: DomSanitizer,
    private readonly dialog: MatDialog,
    private readonly _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.userAccount()
  }

  userAccount(): void{
    this.spinner.show()
    this.userService.finduser().pipe(
      finalize(() =>  this.spinner.hide())
    ).subscribe(resp => {
      this.user = resp
      this.backgroundImg = this.sanitizer.bypassSecurityTrustStyle('url(' + this.user.photo + ')');
    })
  }

  selectPhoto(){
    const photo = this.dialog.open(SelectUserPhotoComponent,  {
      width: '30rem',
      height: '90vh'
    })
    photo.afterClosed().subscribe(resp => {
      if(resp){
        this.updateUserPhoto(resp.data)
      }
    })
  }

  updateUserPhoto(data){
    const body = {
      photo: data
    }
    this.userService.updatePhoto(this.user.user_id, body).subscribe((resp: UserModel) => {
      this.user.photo = resp.photo
      this.openSnackBar('Foto atualizada com sucesso', 'OK')
      this.refreshPhoto(resp.photo)
    }, error => {
        this.openSnackBar('Foto não atualizada', 'OK')
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  refreshPhoto(photo: string){
    this.backgroundImg = this.sanitizer.bypassSecurityTrustStyle('url(' + photo + ')');
  }
}
