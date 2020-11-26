import styled from 'styled-components';

export const BlockContent = styled.div`
  background: transparent;
  padding: 6px 0px;
  display: flex;
  flex-direction: row;
  align-content: center;
  visibility: ${'hidden'};
  width: ${0};
  height: ${0};

  div + div {
    margin: 0px 4px;
  }

  div {
    height: 42px;
    margin: 0px;
  }
  
`