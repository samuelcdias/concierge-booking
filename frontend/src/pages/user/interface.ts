export interface userData {
	data: userModel[],
	count: number,
	limit: number,
}

export interface userModel {
    id?: string | undefined,
    name: string,
    username: string,
    email: string,
    password: string,
    confirmpassword?: string,
    admin?: boolean,      
  }

export interface userParams {
	id?: string;
}