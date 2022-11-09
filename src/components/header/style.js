import styled from 'styled-components'

export default styled.div`
  height: 60px;
  align-items: center;
  box-shadow: 0 1px 5px #ccc;

  .mainBox {
    display: flex;
    justify-content: space-between;

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
    }
  }
`
