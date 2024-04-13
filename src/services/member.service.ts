import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CLOBAL } from 'src/app/app_config';
import { Member } from 'src/models/Memebre';

// decorateur pour vouvoir ajouter dans le composant
// 
@Injectable({
  providedIn: 'root'
})
export class MemberService {
 
  // generatuer de la requette  http de la methode post 
  ONsave(memberTosave:any):Observable<any>{
  
    const Member1={
      ...memberTosave,
      id:Math.ceil(Math.random()*1000),
      createdDate: new Date().toISOString()
    }
  this.tab.push(Member1);
  return new Observable(observer=>observer.next())
///return this.httpClient.post('127.0.0.1:8080/api/Member',memberTosave)
  }
  tab:any[]=CLOBAL.BD.membres;
  constructor(private httpClient:HttpClient ) { }
  // la methode delete 
  // observable coresebondance entre backends et front
  OnDelete(id:string):Observable<any>
  {
    //this.tab=this.tab.filter(item=>item.id!=id);
    
    return new Observable(observer=>observer.next(
      this.tab.filter(item=>item.id!=id)))
      
    //return this.httpClient.delete(`127.0.0.1:8080/api/Member/${id}`);
  }
  getMemebersBYid(id: string): Observable<Member>{
    //return this.httpClient.get<any>(`127.0.0.1:8080/api/Member/${id}`)
    return new Observable(observer=>observer.next(
    this.tab.filter(item=>item.id==id)[0]   ?? null))
  }
  onedit(id:string,m:any):Observable<any>{
    const m1=this.tab.findIndex(item=>item.id==id);
    this.tab[m1]={id:id,...m,
      createdDate:new Date().toISOString};
    this.tab[m1].createdDate = new Date();
    return  new Observable(observer => observer.next());

  }
}
