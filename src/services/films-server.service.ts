import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Film } from 'src/entities/film';
import { Observable } from 'rxjs';
import { UserServerService } from "./user-server.service";

@Injectable({
  providedIn: 'root'
})
export class FilmsServerService {

  url = 'http://localhost:8080/films';
  constructor(private http: HttpClient, private userServerService: UserServerService) {
  }
  get token() {
    return this.userServerService.token;
  }
  getFilms(indexFrom?: number, indexTo?: number, search?: string, orderBy?: string, descending?: boolean): Observable<FilmsResponse> {
    let httpOptions = this.getHeader();
    if (indexFrom || indexTo) {
      httpOptions = { ...(httpOptions || {}), params: new HttpParams() };
    }
    if (indexFrom) {
      httpOptions.params = httpOptions.params.set('indexFrom', '' + indexFrom);
    }
    if (indexTo) {
      httpOptions.params = httpOptions.params.set('indexTo', '' + indexTo);
    }
    if (search) {
      httpOptions.params = httpOptions.params.set('search', search);
    }
    if (orderBy) {
      httpOptions.params = httpOptions.params.set('orderBy', orderBy);
    }
    if (descending) {
      httpOptions.params = httpOptions.params.set('descending', '' + descending);
    }
    return this.http.get<FilmsResponse>(this.url, httpOptions);
  }
  public saveFilm(film: any): Observable<any> {
    return this.http.post(this.url, film, this.getHeader());
  }
  private getHeader(): {
    headers?: { 'X-Auth-Token': string };
    params?: HttpParams
  } {
    return this.token ? { headers: { 'X-Auth-Token': this.token } } : undefined;
  }

}

export interface FilmsResponse {
  items: Film[];
  totalCount: number;
}
