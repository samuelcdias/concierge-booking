import React from 'react';

import { FiUser, FiLock } from "react-icons/fi";
import { Container, Content } from './styles';

import Input from '../../components/Input';
import SideBar from '../../components/SideBar';
import Button from '../../components/Button';

const SigIn: React.FC = () => {
    return(
        

        <Container>
            <Content>
            <form>
                <h1> Faça seu login</h1>
                <Input icon={FiUser} name="username" placeholder="username" autoComplete="false"/>

                <Input icon={FiLock} name="password" type="password" placeholder="senha" />

                <Button type="submit"> Acessar </Button>
            </form>

            </Content>
        </Container>
        
    )
}

export default SigIn;