import api from "./api"
import { History } from 'history'
import { useState, useEffect } from 'react'

export function useDataFetch(key: string) {
  const [data, setData] = useState<any>()
  const [dataConf, setDataConf] = useState()
  const [hasData, setHasData] = useState(false)

  useEffect(() => {
    async function getdataConfigs() {
        try {
            const { data } = await api.get('/config')
            setDataConf(data)
        } catch (error) {
            alert("Ocorreu um erro, tente novamente mais tarde!")
        }
    }
    
    async function getDataList() {
        try {
            const { data } = await api.get(`/${key}`)
            setData(data)
            setHasData(true)
        } catch (error) {
            alert("Ocorreu um erro, tente novamente mais tarde!")
        }
    }
    getdataConfigs()
    getDataList()
  }, [key])

  return {
    data,
    dataConf,
    hasData
  }
}

export function editClick(event: React.MouseEvent<HTMLButtonElement>, key: String, history: History) {
  const index = event.currentTarget.getAttribute('value');
  history.push(`/${key}/${index}`)
}

export function deleteClick(event: React.MouseEvent<HTMLButtonElement>, key: String, history: History) {
  async function deleteData() {
      const index = event.currentTarget.getAttribute('value')
      try {
          await api.delete(`/${key}/${index}`)
      } catch (error) {
          alert("Ocorreu um erro, tente novamente mais tarde!")
      }
  }
  deleteData()
  history.push(`/${key}/`)
}
