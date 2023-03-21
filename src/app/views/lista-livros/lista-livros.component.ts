import { Component, } from '@angular/core';
import { FormControl } from '@angular/forms';
import { catchError,  debounceTime, distinctUntilChanged, EMPTY, filter, map, switchMap, tap, throwError } from 'rxjs';
import { Item, LivrosResult } from 'src/app/models/interfaces';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';
import { LivrosService } from 'src/app/services/livros.service';

const PAUSA = 300;

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent {
  campoBusca = new FormControl();
  mensagemErro: string = ''
  totalLivros: LivrosResult;

  constructor(private livroService: LivrosService) { }

  livroResultadoParaLivros(items: Item[]): LivroVolumeInfo[] {
    return items.map(item => {
      return new LivroVolumeInfo(item)
    })
  }

  totalLivros$ = this.campoBusca.valueChanges
  .pipe(
    debounceTime(PAUSA),
      filter((valorDigitado) => valorDigitado.length >= 3),
      distinctUntilChanged(),
      switchMap((valorDigitado) =>
        this.livroService.buscar(valorDigitado)),
      map(res => {
        this.totalLivros = res
      }),
  )

  livrosEncontrados$ = this.campoBusca.valueChanges
    .pipe(
      debounceTime(PAUSA),
      filter((valorDigitado) => valorDigitado.length >= 3),
      distinctUntilChanged(),
      switchMap((valorDigitado) =>
        this.livroService.buscar(valorDigitado)),
      tap(res => console.log(res)),
      map(res => res.items ?? []),
      map((items) => this.livroResultadoParaLivros(items)),
      catchError(() => {
        this.mensagemErro = 'Ocorreu um erro'
        return EMPTY
      })
    )

}



