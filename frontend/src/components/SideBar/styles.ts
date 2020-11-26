import styled from 'styled-components';
import colors from '../../pages/styles/colors.json'

const Style = styled.div`aside.sidebar {
    position: fixed;
    height: 100%;
    padding: 32px 24px;
    background: linear-gradient(329.54deg, ${colors.second} 0%, ${colors.colour} 100%);
  
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  aside.sidebar  img {
    width: 48px;
  }
  
  aside.sidebar footer a,
  aside.sidebar footer button {
    width: 48px;
    height: 48px;
  
    border: 0;
  
    background: ${colors.primary};
    border-radius: 16px;
  
    cursor: pointer;
  
    transition: background-color 0.2s;
  
    display: flex;
    justify-content: center;
    align-items: center;
  }
    
  aside.sidebar footer a:hover,
  aside.sidebar footer button:hover hover { 
      background: #17D6EB;
  }`

export default Style;