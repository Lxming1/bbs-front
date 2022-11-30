import styled from 'styled-components'

export default styled.div`
  margin-top: 10px;

  .header {
    display: flex;
    .avatar {
      background-color: rgb(255, 255, 255);
      width: 40px;
      height: 40px;
      border-radius: 3px;
      margin-right: 10px;
    }
  }

  .inputGroup {
    display: flex;
    width: 100%;
    align-items: center;

    .commentInput {
      border-radius: 4px;
      border: 1px solid rgb(235, 235, 235);
    }

    .sendBtn {
      height: 34px;
      line-height: 32px;
      font-weight: bold;
      width: 78px;
      font-size: 14px;
      text-align: center;
      border-radius: 3px;
      margin-left: 5px;
      background: none rgb(5, 109, 232);
      border: 1px solid rgb(5, 109, 232);
      color: #fff;
      cursor: pointer;
    }
  }

  .main {
    margin-top: 10px;
    border: 1px solid rgb(235, 235, 235);
    border-radius: 4px;

    .mainHeader {
      padding: 0 20px;
      font-size: 15px;
      font-weight: bold;
      color: #444;
      line-height: 50px;
      border-bottom: 1px solid rgb(235, 235, 235);
    }

    .mainComment {
      padding: 10px 0;
    }
  }
`
