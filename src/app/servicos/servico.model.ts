import { Cliente } from "../cliente/cliente.model";

export class ServicoModel{
    servico_id?: any;
    descricao: string;
    cliente: Cliente;
    data_abertura: Date;
    data_fechamento: Date;
    valor: number;
    status: Status
}

export class Status{
    status_id?: any;
    nome: string;
    codigo: number
}