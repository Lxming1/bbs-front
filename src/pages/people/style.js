import styled from 'styled-components'

export default styled.div`
  width: 1000px;
  margin: 0 auto;

  .header {
    margin-top: 10px;
    background-color: white;
    padding: 20px;
    border-radius: 2px;
    display: flex;
    position: relative;

    .avatar {
      width: 160px;
      height: 160px;
      box-sizing: content-box;
      border: 4px solid #fff;
      border-radius: 8px;
      background-color: #fff;

      img {
        border-radius: 4px;
        height: 100%;
        width: 100%;
      }
    }

    .info {
      margin-left: 32px;
      padding-top: 70px;

      .name {
        font-size: 26px;
        font-synthesis: style;
        font-weight: 600;
        line-height: 30px;
      }
      .gender {
        color: #8590a6;
        display: inline-block;
        text-align: center;
        font-size: 17px;
        margin-top: 10px;
      }

      .expand {
        color: #8590a6;
        font-size: 14px;
        cursor: pointer;
        margin-top: 10px;

        svg {
          margin-right: 5px;
          font-size: 10px;
        }

        :hover {
          color: #76839b;
        }
      }
    }

    .rightBtn {
      height: 34px;
      border-color: #056de8;
      color: #056de8;
      position: absolute;
      right: 24px;
      bottom: 24px;
      text-decoration: none;

      :hover {
        background-color: rgba(5, 109, 232, 0.06);
      }
    }
  }
`
