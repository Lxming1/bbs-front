import styled from 'styled-components'

export default styled.div`
  height: 60px;
  align-items: center;
  background-color: white;
  box-shadow: 0 1px 3px hsl(0deg 0% 7% / 10%);
  min-width: 1024px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;

  .mainBox {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 200px;

    .leftContent {
      display: flex;
      align-items: center;
      height: 100%;

      .logo {
        height: 50px;

        img {
          height: 100%;
          width: auto;
        }
      }
      .navigate {
        display: flex;
        align-items: center;
        height: 60px !important;

        li {
          height: 60px !important;
          line-height: 60px;
        }
      }
    }

    .rightContent {
      display: flex;
      align-items: center;

      .notices {
        font-size: 16px;
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #8590a6;
        margin-right: 20px;
        cursor: pointer;

        .title {
          font-size: 12px;
        }
      }

      .avatar {
        height: 30px;
        width: 30px;
        cursor: pointer;

        img {
          border-radius: 2px;
          height: 100%;
          width: 100%;
        }
      }
    }
  }
`
