import styled from 'styled-components'

export default styled.div`
  width: 420px;
  box-sizing: border-box;
  padding: 30px;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  h2 {
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 20px;
    text-align: center;
  }

  .verifyCode {
    width: calc(100% - 132px);
  }

  .codeBtn {
    width: 132px;
  }
`
