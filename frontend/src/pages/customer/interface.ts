export interface CustomerFetch {
	data: CustomerModel[],
	hasData: boolean,
	dataConf: boolean
	count: number,
	limit: number,
}

export interface CustomerFetchID {
	data: CustomerModel,
	hasData: boolean,
	dataConf: boolean
}

export interface CustomerModel {
	id?: number,
	nome: string,
	cpf: string,
	dt_nascimento: string,
	num_doc_identidade?: string,
	tipo_doc_identidade?: string,
	orgao_doc_identidade?: string,
	nacionalidade?: string,
	profissao?: string,
	dt_identidade?: string,
	genero?: string,
	cidade?: string,
	estado?: string,
	pais?: string,
	motivo_viagem?: 'Lazer - Férias' | 'Negócio' | 'Congresso - Feira' | 'Parentes - Amigos' | 'Estudos - Cursos' | 'Religião' | 'Saúde' | 'Compras' | 'Outro',
	meio_transporte?: 'Avião' | 'Automóvel' | 'Ônibus' | 'Moto' | 'Navio-Barco' | 'Trem' | 'Outro'
}


export interface CustomerParams {
    id: string;
}