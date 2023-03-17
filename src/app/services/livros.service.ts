import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, map } from 'rxjs';
import { Item, LivrosResult } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LivrosService {

  private readonly  API = 'https://www.googleapis.com/books/v1/volumes';


  constructor(private httpClient: HttpClient) { }

  buscar(valorDigitado: string): Observable<Item[]> {
    const params: HttpParams = new HttpParams().append('q', valorDigitado)
    return this. httpClient.get<LivrosResult>(this.API, { params }).pipe(
      map(res => res.items),
    )
  }
}
