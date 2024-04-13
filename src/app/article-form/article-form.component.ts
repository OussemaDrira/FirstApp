import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/models/Article';
import { ArticleService } from 'src/services/article.service';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.css']
})
export class ArticleFormComponent {
  constructor(private MS:ArticleService,private router:Router,private activetedroute:ActivatedRoute ,private dialogRef: MatDialogRef<ArticleFormComponent>,@Inject(MAT_DIALOG_DATA) data: any){

this.name1=data.type;
this.name2=data.titre;
console.log(this.name);

  }
  form !: FormGroup;
  range !:FormGroup;
  idcourant!:string;
  name!:string;
  name1!:string;
   name2!:string;
  name3!:string;
  ngOnInit(): void{ //se charge par defaut qu'on lance le composant
  
      this.initForm();
  }
  initForm():void
  {
   this.form=new FormGroup({

    type:new FormControl(this.name1,[Validators.required]),
    titre:new FormControl(this.name2,[Validators.required]),
    createdDate:new FormControl(null,[Validators.required]),
    lien:new FormControl(null,[Validators.required])
   })
  
  
}
save() {
  this.dialogRef.close(this.form.value);
  console.log(this.form.value);
  this.MS.ONsave(this.form.value).subscribe(()=>{
    this.router.navigate(['/articles'])
  }

  //afficher le table au des articles
  
 
  
)}

close() {
  this.dialogRef.close();
}
}