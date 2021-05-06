export interface UserFetch {
	data: UserModel[],
  hasData: boolean,
  dataConf: boolean,
  count: number,
	limit: number,
}

export interface UserModel {
    id?: string | undefined,
    name: string,
    username: string,
    email?: string,
    password?: string,
    confirmPassword?: string,
    admin?: boolean,      
  }

export interface UserParams {
	id?: string,
  numero?: undefined
	codigo?: undefined,
}