import api from "./api"
import { History } from 'history'
import { useState, useEffect, FormEvent, ChangeEvent } from 'react'

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

export async function handleSubmitClick(event: FormEvent, data: any, key: string, history: History) {
  event.preventDefault()
  try {
    await api.post(`/${key}`, data)

    alert('Cadastro realizado com sucesso!')
    history.push(`/${key}`)
  } catch (err) {
    alert("Houve um problema, verifique se os dados estão corretos.");
  }
}

export  function handleInputChange(event: ChangeEvent<HTMLInputElement>, setState: any, state: any) {
  const target = event.target;
  const value = target.type === 'checkbox' ? target.checked : target.value;
  const name = target.name;

  setState({
    ...state,
    [name]: value
  });
}