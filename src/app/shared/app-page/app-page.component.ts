import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-page',
  templateUrl: './app-page.component.html',
  styleUrls: ['./app-page.component.css']
})
export class AppPageComponent implements OnInit {

  navbarActive: boolean = false;
  darkTheme: boolean = false
  
  constructor(
    private readonly router: Router
  ) { }

  ngOnInit(): void {
  }

  appPage(){
    this.router.navigate(['/download-app'])
  }

  crollToElement($element): void {
    this.navbarActive = false
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

  loginGo(){
    this.router.navigate([''])
  }
}
