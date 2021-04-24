export interface RoomFetch {
	data: RoomModel[],
	hasData: boolean,
  dataConf: boolean,
  count: number,
	limit: number,
}

export interface RoomModel {
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

export interface RoomParams {
	id?: string,
  numero?: string,
}
export interface roomProps {
  type_of_room: string,
  description: string,
  image_url: string
}