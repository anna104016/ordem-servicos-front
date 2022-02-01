import { ServiceModel } from "../services/service.model";

export class Client{
    client_id?: string;
    name: string;
    cpf: string;
    cell_phone: string;
    services: ServiceModel[]
}

export class ReportClients {
    clientes: number
    clientes_com_servico: number
    clientes_sem_servicos: number
}