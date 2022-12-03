import styled from 'styled-components'

export default styled.div`
  height: 60px;
  align-items: center;
  background-color: white;
  box-shadow: 0 1px 3px hsl(0deg 0% 7% / 10%);

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