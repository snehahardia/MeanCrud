import { Injectable } from '@angular/core';
import { map, tap, catchError} from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpResponse  } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    responseType : 'text' as 'json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ListService {

  uri = 'http://localhost:3000';

  constructor(private _http: HttpClient) { }

  addList( oList){
    return this._http.post(`${this.uri}/add`, JSON.stringify(oList), httpOptions)
    .pipe(map((response: HttpResponse<any>) => response));
  }

  getLists() {
    return this._http.get(`${this.uri}/list`,  httpOptions).pipe(
        map((response: HttpResponse<any>) =>response));
  }

  getList(listId) {
   
    return this._http.get(`${this.uri}/list/${listId}`, httpOptions).pipe(
        map((response: HttpResponse<any>) => response));
  }

  editList(listId, oList){
    return this._http.put(`${this.uri}/list/edit/${listId}`, JSON.stringify(oList), httpOptions).pipe(
      map((response:  HttpResponse<any>) => response));
  }

  deleteList(listId) {
    return this._http.delete(`${this.uri}/list/${listId}`, httpOptions).pipe(
      map((response: HttpResponse<any>) => response));
  }
}
