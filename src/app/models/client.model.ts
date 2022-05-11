import { ServiceModel } from "./service.model";

export class ResClientResolve {
    cliente: Client
}
export class Client{
    client_id?: number;
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