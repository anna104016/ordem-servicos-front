import { Cliente } from "../cliente/cliente.model";

export class ServicoModel{
    id?: any;
    descricao: string;
    cliente: Cliente;
    dataAbertura?: any;
    dataFechamento?: any;
    valor: string;
    status: string;
}