export interface Reserva {
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

export interface Quarto {
    id: string;
    numero?: number;
    descricao: string;
    nro_camas?: number;
    tipo: string;
    image_url: string;
    cama_extra?: number;
}