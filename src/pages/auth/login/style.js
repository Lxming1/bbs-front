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
  background: white;

  h2 {
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 20px;
    text-align: center;
  }

  .checkbox {
    display: flex;
    line-height: 16px;
    font-size: 12px;
    margin-bottom: 15px;
  }

  .loginBtn {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
  }

  .loginFooter {
    text-align: center;
    margin-top: 20px;
  }
`
