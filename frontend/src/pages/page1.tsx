import React, { useEffect, useState, FormEvent } from 'react';

import '.styles/pages/page1.css'
import { useParams , Link, useHistory } from 'react-router-dom'
import api from '../services/api';

interface Variavel {
    id: number;
    name: string;
    xadrez: string[]
}
interface VariavelParams{
    id: string;
}

export default function Page1() {
    const history = useHistory();

    const params = useParams<VariavelParams>();
    const [variavel , setVariavel] = useState<Variavel[]>();
    const [variavel2 , setVariavel2] = useState<Variavel>();
    const [name, setName] = useState('');
    /*
        variavel => o que
        setVariavel => função que vai atualizar a variavel
        
    */
    async function handleSubmit (event: FormEvent) {
        event.preventDefault();

        const data = new FormData();
        data.append('name', name);

        await api.post('TabelaBD', data)

        alert('Cadastro realizado com sucesso!')
        history.push('/');
    }

    useEffect(() => {
        api.get(` page1/${params.id}`).then(res => {
            setVariavel(res.data);
        });  
    }, [params.id]); //primeiro parâmetro, função / segundo, quando (na mudança da variavel)
    
    return (
        <div className="page1">
            conteudo
            <Link to='/page2' className='loggin'>
                loggin
            </Link>
            <form onSubmit={handleSubmit}>
                <div className="input-block">
                    <label htmlFor="name">Nome</label>
                    <input id="name" value={name} onChange={ event => setName(event.target.value)} />
                </div>
            </form>
            
            <button
                className="active"
                type="button"
                onClick={() => {
                    //setVariavel2(variavel2.id);
                }}
               
            /*variavel.xadrez.map( (xadrezvar, index) =&gt; {
                    return (
                        //função que utiliza cada argumento da variavel
                        console.log(`isso é ${var}`)
                    )
                })*/
             />
        </div>
    );
};