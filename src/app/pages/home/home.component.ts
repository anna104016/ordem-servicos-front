import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  navbarActive: boolean = false;
  formLoginActive: boolean = false;
  invalidCredentials: string
  darkTheme: boolean = false
  loading: boolean = false

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  scrollToElement($element): void {
    this.navbarActive = false
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

  loginGo(){
    this.router.navigate(['/login'])
  }
}
