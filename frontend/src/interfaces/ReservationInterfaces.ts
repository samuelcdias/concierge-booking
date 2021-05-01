import { CustomerModel } from './CustomerInterfaces'

export interface ReservationFetch {
	data: ReservationView[],
	hasData: boolean,
	dataConf: boolean
	count: number,
	limit: number,
}

export interface ReservationFormProps {
    reservation: ReservationModel
    roomSelected: string
    customerList: CustomerModel[]
}

export interface ReservationView {
    codigo: string;
    room_number: number;
    dt_entrada_reserva: string;
    dt_saida_reserva: string;
    hora_entrada?: string | null;
    hora_saida?: string| null;
    forma_pagamento: string;
    tarifa: number;
    no_show: boolean;
    obs?: string;   
}

export interface ReservationModel {
    codigo: string;
    dt_entrada_reserva: Date;
    dt_saida_reserva: Date;
    hora_entrada?: string | null;
    hora_saida?: string| null;
    forma_pagamento: string;
    tarifa: number;
    no_show: boolean;
    obs?: string;   
}
export interface ReservationParams {
    id: undefined,
	codigo: string,
    numero?: undefined
}
