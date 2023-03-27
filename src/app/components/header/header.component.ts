import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  isNavbarCollapsed= true;
  isLoggedIn: boolean;
  loggedInUser: string | null;
  
  constructor(private loginService: LoginService,
              private router: Router
  ){}

  ngOnInit(): void {
    this.loginService.getAuth().subscribe(auth => {
      if(auth){
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;
      }else{
        this.isLoggedIn = false;
      }
    })
  }

  LogOut(){
    this.loginService.LogOut()
    this.isLoggedIn = false;
    this.router.navigate(['/login'])
  }
}
