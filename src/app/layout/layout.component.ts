import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/AuthService ';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  user!:any;
  constructor(private Ms:AuthService,private router: Router ){
    this.Ms.getUserClaims().then((u)=>{
      this.user=u;
      if(!!this.user)console.log(this.user.displayName)
    })

  }
  logout():void{
    this.Ms.doLogout().then(()=>{
      this.router.navigate(['/login'])
    
    })
      }

}
