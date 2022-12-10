import styled from 'styled-components'

export default styled.div`
  position: fixed;
  right: 400px;
  bottom: 100px;
  width: 50px;
  height: 50px;
  background-color: red;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: rgb(24, 25, 28);
  border: 1px solid rgb(227, 229, 231);
  background-color: white;
  border-radius: 10px;
  cursor: pointer;

  :hover {
    background-color: #e3e5e7;
  }
`
