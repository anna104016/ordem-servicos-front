import { ServicoModel } from "../servicos/servico.model";

export class Cliente{
    cliente_id?: string;
    nome: string;
    cpf: number;
    telefone: string;
    servicos: ServicoModel
}