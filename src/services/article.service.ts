import { Injectable } from '@angular/core';
import { CLOBAL } from 'src/app/app_config';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Article } from 'src/models/Article';
@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  
  tab:any[]=[];
  GetAll():Observable<Article[]>
  {
    return this.httpClient.get<Article[]>('http://localhost:3000/articles') ;

  }
  constructor(private httpClient:HttpClient ) { }
  ONsave(form:any):Observable<any>{

  return this.httpClient.post("http://localhost:3000/articles",form);
  }
  OnDelete(id: string): Observable<any> {
  // Supprime l'élément de la liste tab
  // this.tab = this.tab.filter(item => item.id !== id);

  return this.httpClient.delete(`http://localhost:3000/articles/${id}`);
  
}
  getArticlesBYid(id: string): Observable<Article>
  {
    
    //return new Observable(observer=>observer.next(
    //this.tab.filter(item=>item.id==id)[0]   ?? null)
  return this.httpClient.get<Article>(`http://localhost:3000/articles/${id}`);
  }
  onedit(id:string,m:any):Observable<any>{
    const m1=this.tab.findIndex(item=>item.id==id);
    this.tab[m1]={id:id,...m,
      createdDate:new Date().toISOString};
    this.tab[m1].createdDate = new Date();
    return  new Observable(observer => observer.next());

  }
}
