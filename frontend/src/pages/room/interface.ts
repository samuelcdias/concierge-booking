export interface roomData {
	data: roomModel[],
	count: number,
	limit: number,
}

export interface roomModel {
    id?: string | undefined,
    room_number: string,
    description: string,
    number_of_beds: number,
    type_of_room: string,
    image_url?: string | undefined,
    number_of_extra_beds?: number,
    dt_last_cleaning?: Date | undefined,
    dt_last_maintenance?: Date | undefined,
  }

export interface roomParams {
	id?: string;
    numero?: string;
}