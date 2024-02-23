import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Xuxemon } from '../models/xuxemon.model';
@Injectable({
  providedIn: 'root'
})
export class XuxemonServicesService {

  constructor(private http: HttpClient) { }

  GetXuxemons(): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/api/xuxemons`);
  }
  GetXuxemonById(id: number): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/api/xuxemons/${id}`);
  }
  // UpdateXuxemonById(Xuxemon:Xuxemon , id:number): Observable<any> {
  //   return this.http.put(`http://127.0.0.1:8000/api/xuxemons/${id}`,Xuxemon.)
  // }


}
