import { Component,  } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, switchMap, tap } from 'rxjs';
import { Item } from 'src/app/models/interfaces';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';
import { LivrosService } from 'src/app/services/livros.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent {
  campoBusca = new FormControl();

  constructor(private livroService: LivrosService) { }

  livroResultadoParaLivros(items: Item[]): LivroVolumeInfo[] {
  return items.map(item => {
    return new LivroVolumeInfo(item)
  })
  }

  livrosEncontrados$ = this.campoBusca.valueChanges
    .pipe(
        tap(res => console.log(res)),
        switchMap((valorDigitado) => 
          this.livroService.buscar(valorDigitado)),
        tap(() => console.log('req ao servidor')),
        map((items) => this.livroResultadoParaLivros(items))
    )
}



