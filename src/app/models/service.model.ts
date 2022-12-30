import { Client } from "./client.model";

export interface ServiceModel{
    service_id?: number;
    description: string;
    client: Client;
    opening_date?: Date;
    closing_date?: Date;
    price: number;
    status?: Status
}

export interface Status{
    status_id?: number;
    name: string;
    code: number
}
export interface ReportServices {
    servicos_abertos:number
    servicos: number
    servicos_fechados: number
}
export interface IRespGetServices{
    services: ServiceModel[],
    page?: number,
    totalSize: number,
    count?: number,
}

