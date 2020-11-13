import React, { useEffect, useState } from 'react' //Função que

import '.styles/pages/reserva-form.css'
import { Link } from 'react-router-dom'
import api from '../services/api';

interface Cliente { 
    id: number;
    nome: string;
    cpf: string;
    num_doc_identidade: string;
    tipo_doc_identidade: string;
    orgao_doc_identidade: string;
    nacionalidade: string;
    profissao: string;
    dt_nascimento: Date;
    dt_identidade: Date;
    genero: string;
    cidade: string;
    estado: string;
    pais: string;
    motivo_viagem: string;
    meio_transporte: string;
}
interface Quarto {
    id: string;
    numero: number;
    nro_camas: number;
    tipo: string;
    image_url: string;
    cama_extra: number;
}
interface Reserva {
    codigo: string;
    dt_entrada_reserva: Date;
    dt_saida_reserva: Date;
    hora_entrada: Date;
    hora_saida: Date;
    forma_pagamento: string;
    tarifa: number;
    no_show: boolean;
    obs: string;   
}

function Page1() {
    /*
    const [reserva, setReserva ] = useState<Reserva>
    

    const [variavel, setVariavel = useState<Variavel[]>([]);
    /*
        variavel => o que
        setVariavel => função que vai atualizar a variavel
        */  
/*
    useEffect(() => {
        api.get('page2').then(res => {
            setVariavel(res.data);
        });  
    }, []); //primeiro parâmetro, função / segundo, quando

    return (
        <div className="page1">
            conteudo
            <Link to='/page2' className='loggin'>
                loggin
            </Link>
            {
                variavel.map( var => {
                    return (
                        //função que utiliza cada argumento da variavel
                        console.log('isso é ${var}')
                    )
                })
            }
        </div>
    );*/
}

export default Page1;