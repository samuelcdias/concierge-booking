export interface roomData {
	data: [{
		id?: string | undefined,
		numero: string,
		descricao: string,
		nro_camas: number,
		tipo: string,
		image_url?: string,
		cama_extra?: number,
		dt_limpeza?: Date,
		dt_manutencao?: Date,
		status?: string,    
	}],
	count: number,
	limit: number,
}

export interface roomInterface {
    id?: string | undefined,
    numero: string,
    descricao: string,
    nro_camas: number,
    tipo: string,
    image_url?: string | undefined,
    cama_extra?: number,
    dt_limpeza?: Date | undefined,
    dt_manutencao?: Date | undefined,
    status?: string | undefined,    
  }

export interface roomParams {
	id?: string;
    numero?: string;
}