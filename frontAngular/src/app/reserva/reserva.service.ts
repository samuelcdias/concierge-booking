import { environment as env } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  constructor(private http:HttpClient) { }

  private apiUrl : string = env.apiBaseUrl + 'reserva'
  
  get() {
    return this.http.get(this.apiUrl).toPromise()
  }

  save(body: any) {
    return this.http.post(this.apiUrl, body).toPromise()
  }

  update(body: any) {
    return this.http.put(this.apiUrl, body).toPromise()
  }

  getById(id: number) {
    return this.http.get(this.apiUrl + '/' + id).toPromise()
  }

  remove(id: number){
    return this.http.request('DELETE', this.apiUrl,
    {body: { _id: id }}).toPromise()
  }


  filterByDate(body: any) {
    return this.http.get(this.apiUrl + 'f').toPromise()
  }
}
