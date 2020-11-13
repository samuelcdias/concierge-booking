import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import logo from "../../assets/images/logo.svg";

import Aside from './styles';

export default function Sidebar() {
  const { goBack } = useHistory();

  return (
    <Aside>
      <img src={logo} alt="Logo" />

      <footer>
        <button type="button" onClick={goBack}>
          <FiArrowLeft size={24} color="#FFF" />
        </button>
      </footer>
    </Aside>
  );
}