import { ServicoModel } from "../servicos/servico.model";

export class Cliente{
    cliente_id?: string;
    nome: string;
    cpf: number;
    telefone: string;
    servicos: ServicoModel
}

export class RelatoriosClientes {
    clientes: number
    clientes_com_servico: number
    clientes_sem_servicos: number
}