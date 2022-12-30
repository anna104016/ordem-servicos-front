import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Photo } from 'src/app/models/user.model';
import { userPhotosList } from './user_photos_list';

@Component({
  selector: 'app-select-user-photo',
  templateUrl: './select-user-photo.component.html',
  styleUrls: ['./select-user-photo.component.scss']
})
export class SelectUserPhotoComponent implements OnInit {

  photoSelected: Photo = {img: '', value: ''}

  @ViewChild('photo') photo: HTMLElement

  photos = userPhotosList
  
  constructor(
    private readonly dialogRef: MatDialogRef<SelectUserPhotoComponent>
  ) { }

  ngOnInit(): void {
  }

  close(){
      this.dialogRef.close({
        data: this.photoSelected.img
      })
  }

  select(photo: Photo){
    this.photoSelected.img = photo.img
  }
}
