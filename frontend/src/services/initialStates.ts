import { CustomerModel, CustomerParams } from "../interfaces/CustomerInterfaces"
import { ReservationModel, ReservationParams } from "../interfaces/ReservationInterfaces"
import { RoomModel, RoomParams } from "../interfaces/RoomInterfaces"
import { UserModel, UserParams } from "../interfaces/UserInterfaces"

export interface ParamsType {
    id?: string,
    numero?: undefined,
    pageNumber?: string
}

export enum enumParams {
    ROOMS = 'rooms',
    USERS = 'users',
    CUSTOMERS = 'customers',
    RESERVATIONs = 'reservations',
    OTHERS = 'others'
}

function unhandledChoice(): never {
    throw new Error("Choice not defined")
}

export function selectInitialState(
    {
        key,
        params
    }: {
        key: enumParams;
        params: CustomerParams | RoomParams | UserParams | ReservationParams
    }): any {


    switch (key) {
        case enumParams.ROOMS:
            const roomObj: RoomModel = {
                id: params.numero ? params.numero : undefined,
                room_number: params.numero ? params.numero : '',
                description: '',
                number_of_beds: 0,
                type_of_room: '',
                image_url: '',
                number_of_extra_beds: 0,
                dt_last_cleaning: undefined,
                dt_last_maintenance: undefined,
            }
            return roomObj
        case enumParams.USERS:
            const userObj: UserModel = {
                id: params.id ? params.id : undefined,
                name: '',
                username: '',
                email: '',
                password: '',
                confirmPassword: ''
            }
            return userObj
        case enumParams.CUSTOMERS:
            const customerObj: CustomerModel = {
                id: params.id ? params.id : undefined,
                nome: '',
                cpf: '',
                dt_nascimento: '',
                num_doc_identidade: '',
                tipo_doc_identidade: '',
                orgao_doc_identidade: '',
                nacionalidade: '',
                profissao: '',
                dt_identidade: '',
                genero: '',
                cidade: '',
                estado: '',
                pais: '',
                motivo_viagem: undefined,
                meio_transporte: undefined
            }
            return customerObj
        case enumParams.RESERVATIONs:
            const reservationObj: ReservationModel = {
                codigo: params.codigo!,
                dt_entrada_reserva: new Date(),
                dt_saida_reserva: new Date(),
                hora_entrada: null,
                hora_saida: null,
                forma_pagamento: "CC",
                tarifa: 100,
                no_show: false,
                obs: "",
            }
            return reservationObj
        default:
            return unhandledChoice()
    }
}