import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Photo } from 'src/app/models/user.model';

@Component({
  selector: 'app-select-user-photo',
  templateUrl: './select-user-photo.component.html',
  styleUrls: ['./select-user-photo.component.css']
})
export class SelectUserPhotoComponent implements OnInit {

  photoSelected: Photo = new Photo()

  @ViewChild('photo') photo: HTMLElement

  photos: Photo[] = [
    {img: 'https://services-on.netlify.app/assets/avatar-01.png', value: 'https://services-on.netlify.app/assets/avatar-01.png'},
    {img: 'https://services-on.netlify.app/assets/avatar-02.png', value: 'https://services-on.netlify.app/assets/avatar-02.png'},
    {img: 'https://services-on.netlify.app/assets/avatar-03.png', value: 'https://services-on.netlify.app/assets/avatar-03.png'},
    {img: 'https://services-on.netlify.app/assets/avatar-04.png', value: 'https://services-on.netlify.app/assets/avatar-04.png'},
    {img: 'https://services-on.netlify.app/assets/avatar-05.png', value: 'https://services-on.netlify.app/assets/avatar-05.png'},
    {img: 'https://services-on.netlify.app/assets/avatar-06.png', value: 'https://services-on.netlify.app/assets/avatar-06.png'},
    {img: 'https://services-on.netlify.app/assets/avatar-07.png', value: 'https://services-on.netlify.app/assets/avatar-07.png'},
    {img: 'https://services-on.netlify.app/assets/avatar-08.png', value: 'https://services-on.netlify.app/assets/avatar-08.png'},
    {img: 'https://services-on.netlify.app/assets/avatar-09.png', value: 'https://services-on.netlify.app/assets/avatar-09.png'},
    {img: 'https://services-on.netlify.app/assets/avatar-11.png', value: 'https://services-on.netlify.app/assets/avatar-11.png'},
    {img: 'https://services-on.netlify.app/assets/avatar-10.png', value: 'https://services-on.netlify.app/assets/avatar-10.png'},
    {img: 'https://services-on.netlify.app/assets/avatar-12.png', value: 'https://services-on.netlify.app/assets/avatar-12.png'},
  ]

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
