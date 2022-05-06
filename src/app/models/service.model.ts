import { Client } from "./client.model";

export class ServiceModel{
    service_id?: number;
    description: string;
    client: Client;
    opening_date: Date;
    closing_date: Date;
    price: number;
    status: Status
}

export class Status{
    status_id?: number;
    name: string;
    code: number
}

export class ReportServices {
    servicos_abertos:number
    servicos: number 
    servicos_fechados:  number
}