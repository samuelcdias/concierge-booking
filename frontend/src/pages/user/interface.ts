export interface UserFetch {
	data: UserData,
	hasData: boolean,
	dataConf: boolean
}

export interface UserData {
	data: UserModel[],
	count: number,
	limit: number,
}

export interface UserModel {
    id?: string | undefined,
    name: string,
    username: string,
    email: string,
    password: string,
    confirmpassword?: string,
    admin?: boolean,      
  }

export interface UserParams {
	id?: string;
}