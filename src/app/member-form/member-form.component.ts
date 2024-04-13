import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from 'src/models/Memebre';
import { MemberService } from 'src/services/member.service';


@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css']
})
export class MemberFormComponent implements OnInit{

//injection de depandances
constructor(private MS:MemberService,private router:Router,private activetedroute:ActivatedRoute ){


}


// le form est contien des information 
  form !: FormGroup;
  idcourant!:string;
  ngOnInit(): void{ //se charge par defaut qu'on lance le composant
  /// chercher id dans la route 
  this.idcourant= this.activetedroute.snapshot.params['id']
  console.log(this.idcourant)
  // if trulie idcourant exite ou nom 
  if(!!this.idcourant){
    this.MS.getMemebersBYid(this.idcourant).subscribe((m)=>{ 
      console.log(m)
      this.initForm2(m)})
      // cration 
    }else 
      this.initForm();
      
    
  
  // if id exixte et a une valeur 
  // je suis dans edit
  // getMemebers(id) =>Memeber => this.initForm2(Memeber)
  // else je suis dans une methode de creation =>this.initForm()
  
     // this.initForm() ;  
  }
   initForm():void
   {
    this.form=new FormGroup({
      cin:new FormControl(null,[Validators.required]),
      name:new FormControl(null,[Validators.required]),
      cv:new FormControl(null,[Validators.required]),
      type:new FormControl(null,[Validators.required])
    })
   }
   initForm2(m:Member):void
   {
    this.form=new FormGroup({
      cin:new FormControl(m.cin,[Validators.required]),
      name:new FormControl(m.name,[Validators.required]),
      cv:new FormControl(m.cv,[Validators.required]),
      type:new FormControl(m.type,[Validators.required])
    })
   }
   onsub():void
   {
    console.log("xxxx")
    this.idcourant= this.activetedroute.snapshot.params['id']
    if(!!this.idcourant){
      console.log("je suis dans edit")
      // je suis dans edit 
      this.MS.onedit(this.idcourant,this.form.value).subscribe((m)=>{ 
        console.log(m)
        this.router.navigate(['/member'])})
        // cration 
      }else {
        console.log("je suis dans create")
      console.log(this.form.value)
      const Membertosave=this.form.value;
      this.MS.ONsave(Membertosave).subscribe(()=>{this.router.navigate(['/member'])}
      )
    }
    //recuperation des valeurs
    
   }
  

}