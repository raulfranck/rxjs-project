import { Component,  } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, filter, map, switchMap, tap } from 'rxjs';
import { Item } from 'src/app/models/interfaces';
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

  constructor(private livroService: LivrosService) { }

  livroResultadoParaLivros(items: Item[]): LivroVolumeInfo[] {
  return items.map(item => {
    return new LivroVolumeInfo(item)
  })
  }

  livrosEncontrados$ = this.campoBusca.valueChanges
    .pipe(
        debounceTime(PAUSA),
        filter((valorDigitado) => valorDigitado.length >= 3),
        switchMap((valorDigitado) => 
          this.livroService.buscar(valorDigitado)),
        map((items) => this.livroResultadoParaLivros(items))
    )

}



