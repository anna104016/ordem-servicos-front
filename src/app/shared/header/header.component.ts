import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }


  clientes(){
    this.router.navigate(['/clientes'])
  }

  servicos(){
    this.router.navigate(['/servicos'])
  }

  home(){
    this.router.navigate([''])
  }
}