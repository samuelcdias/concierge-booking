import { CustomerModel } from './CustomerInterfaces'

export interface ReservationForm {
    reservation: ReservationModel
    roomSelected: string
    customerList: CustomerModel[]
}

export interface ReservationModel {
    id?: number;
    codigo: string;
    dt_entrada_reserva: Date;
    dt_saida_reserva: Date;
    hora_entrada?: Date | null;
    hora_saida?: Date| null;
    forma_pagamento: string;
    tarifa: number;
    no_show: boolean;
    obs?: string;   
}
