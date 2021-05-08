import { getToken } from "./auth"
import api from './api'
import { addNotification } from "../components/notifications"

interface Data {
  dataConf: boolean,
  hasData: boolean,
  data: any,
  count: number,
  limit: number
}

export async function useDataFetch(key: string):Promise<Data> {
  let hasData: boolean = false
  let dataConf = JSON.parse(getToken() || '{}').usesnrhos || false
  let data = {}
  let count = 0
  let limit = 10
  
  try {
    const response = await api.get(`/${key}`)
    data = response.data.data === undefined ? response.data : response.data.data
    count = response.data.count === undefined ? 0 : parseInt(response.data.count)
    limit = response.data.limit === undefined ? 10 : response.data.limit
    hasData = (count === 0 ? false : true)
  } catch (e) {
    const msg = "Ocorreu um erro, tente novamente mais tarde!"
    addNotification({title: "getData", message: msg, type: "warning"})
  }

  return {
    data: data,
    hasData: hasData,
    dataConf: dataConf,
    count: count,
    limit: limit
  }
}


