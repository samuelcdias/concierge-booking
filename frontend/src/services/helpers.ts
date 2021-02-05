import api from "./api"
import { History } from 'history'
import { useState, useEffect, FormEvent, ChangeEvent } from 'react'
import { isAuthenticated, getToken, logout } from "./auth"

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
    alert("Ocorreu um erro, tente novamente mais tarde!")
  }

  return {
    data: data,
    hasData: hasData,
    dataConf: dataConf,
    count: count,
    limit: limit
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
    alert("Houve um problema, verifique se os dados estão corretos.")
  }
}

export  function handleInputChange(event: ChangeEvent<HTMLInputElement>, setState: any, state: any) {
  const target = event.target
  const value = target.type === 'checkbox' ? target.checked : target.value
  const name = target.name

  setState({
    ...state,
    [name]: value
  })
}
export  function useLoggedIn() {
  const [auth, setAuth] = useState(false)
  
  function validate(){
    try {
      const is_valid =  JSON.parse(getToken()|| '{}').exp > Math.floor(Date.now() / 1000)
      return is_valid
    } catch (err) {
      return false
    }
  }

  if (!validate()) {
    logout()
  }

  useEffect(() => {
      setAuth(isAuthenticated())
  },[auth])
  return auth
}


