import { ServiceModel } from "./service.model";

export interface ResClientResolve {
    cliente: Client
}
export interface Client{
    client_id?: number;
    name: string;
    cpf: string;
    cell_phone: string;
    services: ServiceModel[]
}
export interface ReportClients {
    clientes: number
    clientes_com_servico: number
    clientes_sem_servicos: number
}

export interface IRespGetClients{
    users: Client[],
    page?: number,
    totalSize: number,
    count?: number,
}
