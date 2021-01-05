export interface userData {
	data: [{
		id?: string | undefined,
        name: string,
        username: string,
        email: string,
        admin: boolean,   
	}],
	count: number,
	limit: number,
}

export interface userInterface {
    id?: string | undefined,
    name: string,
    username: string,
    email: string,
    password: string,
    confirmpassword: string,
    admin?: boolean,      
  }

export interface userParams {
	id?: string;
}