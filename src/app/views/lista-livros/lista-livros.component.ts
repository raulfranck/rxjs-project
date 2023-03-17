import { Component, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Subscription, switchMap } from 'rxjs';
import { Item, Livro } from 'src/app/models/interfaces';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';
import { LivrosService } from 'src/app/services/livros.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent implements OnDestroy {

  listaLivros: Livro[];
  campoBusca = new FormControl() ;
  subscription: Subscription;
  livro: Livro;

  constructor(private livroService: LivrosService) { }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  livroResultadoParaLivros(items: Item[]): LivroVolumeInfo[] {
  return items.map(item => {
    return new LivroVolumeInfo(item)
  })
  }

  livrosEncontrados$ = this.campoBusca.valueChanges
    .pipe(
        switchMap((valorDigitado) => 
          this.livroService.buscar(valorDigitado)),
        map((items) => this.listaLivros = this.livroResultadoParaLivros(items))
    )

 /*  buscarLivros() {
    this.subscription = this.livroService.buscar(this.campoBusca).subscribe({
      next: items => {
        console.log('reuquisicoes ao servidor')
        this.listaLivros = this.livroResultadoParaLivros(items)
      },
      error: error => console.error(error),
    })
  } */

}



