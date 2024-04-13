import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/AuthService ';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private Ms:AuthService,private router: Router ){

  }
  SINGIN():void{
this.Ms.doGoogleLogin().then(()=>{
  this.router.navigate(['/dashboard'])

})
  }

}
