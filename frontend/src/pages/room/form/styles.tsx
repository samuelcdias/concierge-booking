import styled from "styled-components";
import colors from "../../../styles/colors.json"

const isHidden: boolean = true

export const BlockContent = styled.fieldset`
  background: transparent;
  padding: 6px 0px;
  display: flex;
  flex-direction: column;
  align-content: center;
  visibility: ${isHidden? 'hidden' : 'visible'};
  width: ${isHidden? 0 : '100%'};
  height: ${isHidden? '0 !important' : '100%'};
  
  legend {
    font-size: 16px;
    width: ${isHidden? 0 : '100%'};
    height: ${isHidden? 0 : '100%'};
  }

  div + div {
    margin: 0px 8px;
  }

  div {
    display: flex;
    flex-direction: row;
    margin: 0px;
    width: ${isHidden? 0 : '100%'};
    height: ${isHidden? 0 : '100%'};
  }
  
`;


export const Content = styled.div`
  height: 100%;
`
  
