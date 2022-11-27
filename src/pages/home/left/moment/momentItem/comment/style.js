import styled from 'styled-components'

export default styled.div`
  .header {
    display: flex;
    .avatar {
      background-color: rgb(255, 255, 255);
      width: 40px;
      height: 40px;
      border-radius: 3px;
      margin-right: 10px;
    }

    .inputGroup {
      display: flex;
      width: 100%;
      align-items: center;

      .commentInput {
        border-radius: 4px;
        border: 1px solid rgb(235, 235, 235);
      }

      .submitBtn {
        height: 34px;
        line-height: 32px;
        font-weight: bold;
        width: 78px;
        font-size: 14px;
        color: rgb(255, 255, 255);
        text-align: center;
        cursor: pointer;
        background: none rgb(5, 109, 232);
        border: 1px solid rgb(5, 109, 232);
        border-radius: 3px;
        margin-left: 5px;
      }
    }
  }
`
