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

    /* .Input {
      border-radius: 4px;
      border: 1px solid rgb(235, 235, 235);
    } */
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
