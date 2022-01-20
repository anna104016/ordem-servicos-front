import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ServicoModel } from './servico.model';

@Injectable({
  providedIn: 'root'
})
export class ServicosService {

  baseUrl: String = environment.baseUrl;

  constructor(private http: HttpClient, private snack: MatSnackBar) { }


  findAllServicos(): Observable<ServicoModel[]>{
    const url = `${this.baseUrl}/servicos`;
    return this.http.get<ServicoModel[]>(url);
  }

  finById(id: string): Observable<ServicoModel>{
    const url = `${this.baseUrl}/servicos/${id}`;
    return this.http.get<ServicoModel>(url);
  }

  novo(novoservico: ServicoModel): Observable<ServicoModel>{
    const url = `${this.baseUrl}/servicos`;
    return this.http.post<ServicoModel>(url, novoservico);
  }

  atualizar(servicosnew: ServicoModel): Observable<ServicoModel>{
    const url = `${this.baseUrl}/servicos/${servicosnew.id}`;
    return this.http.put<ServicoModel>(url, servicosnew);
  }

  deletar(id: string): Observable<void>{
    const url = `${this.baseUrl}/servicos/${id}`;
    return this.http.delete<void>(url);
  }

  mensagem(string: String): void{
    this.snack.open(`${string}`, 'OK', 
    {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    });
  }
}
