import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evt } from 'src/models/Evt';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private httpClient:HttpClient) { }
  GetAll():Observable<Evt[]>
  {
    return this.httpClient.get<Evt[]>('http://localhost:3000/evenemnt');
  }
  save(data:Evt):Observable<void>
  {
    return this.httpClient.post<void>('http://localhost:3000/evenemnt',data);
  }

  }

