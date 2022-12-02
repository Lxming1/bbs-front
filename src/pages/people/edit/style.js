import styled from 'styled-components'

export default styled.div`
  width: 1000px;
  padding: 20px 20px 10px 20px;
  background-color: #fff;
  margin: 0 auto;
  margin-top: 40px;

  .left {
    position: relative;
    .avatar {
      width: 160px;
      height: 160px;
      box-sizing: content-box;
      border: 4px solid #fff;
      border-radius: 8px;
      background-color: #fff;
      position: relative;
      top: -45px;

      img {
        border-radius: 4px;
        height: 100%;
        width: 100%;
      }

      .avatarWrapper {
        border-radius: 8px;
        background: #121212;
        opacity: 0.4;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        cursor: pointer;
        color: white;
      }

      .tips {
        color: #fff;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 15px;
        width: 100px;
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;

        svg {
          font-size: 30px;
          margin-bottom: 20px;
        }
      }
    }
  }

  .right {
    padding-left: 32px;
    padding-top: 16px;
    flex: 1;

    .name {
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      display: inline-block;
      font-size: 26px;
      font-synthesis: style;
      font-weight: 600;
    }

    .editBox {
      li {
        height: 96px;
        padding: 30px 0;
        border-bottom: 1px solid #ebebeb;
        display: flex;
        align-items: center;

        .key {
          color: #444;
          line-height: 36px;
          font-size: 15px;
          font-synthesis: style;
          font-weight: 600;
          width: 140px;
        }
      }
    }
  }
  .editName {
    margin-left: 20px;
    cursor: pointer;
    color: #175199;
    font-size: 14px;
    font-weight: 500;
  }

  .save {
    padding: 40px 0 35px;

    div {
      margin: 0 auto;
    }
  }
`
