import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cliente, RelatoriosClientes } from './cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  baseUrl: String = environment.baseUrl;

  constructor(private http: HttpClient, private snack: MatSnackBar) { }

  findById(id: string): Observable<Cliente>{
    const url = `${this.baseUrl}/clientes/${id}`
    return this.http.get<Cliente>(url);
  }

  findAllClientes(): Observable<Cliente[]> {
    const url = `${this.baseUrl}/clientes`;
    return this.http.get<Cliente[]>(url);
  }

  novoCliente(cliente: Cliente): Observable<Cliente>{
    const url = `${this.baseUrl}/clientes`;
    return this.http.post<Cliente>(url,cliente);
  }

  editar(cliente: Cliente): Observable<void>{
    const url = `${this.baseUrl}/clientes/${cliente.cliente_id}`;
    return this.http.put<void>(url,cliente)
  }

  deletarCliente(id: string):Observable<void>{
    const url = `${this.baseUrl}/clientes/${id}`;
    return this.http.delete<void>(url);
  }

  relatorios(): Observable<RelatoriosClientes> {
    const url = `${this.baseUrl}/clientes/servicos/relatorios`;
    return this.http.get<RelatoriosClientes>(url);
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
