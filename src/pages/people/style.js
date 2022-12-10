import styled from 'styled-components'

export default styled.div`
  position: relative;
  top: 70px;

  .mainBox {
    margin: 0 auto;

    .leftContent {
      background-color: #fff;
      width: 694px;
    }

    .rightContent {
      background-color: #fff;
      width: 296px;
    }
  }

  .careBtn {
    background-color: #8590a6;
    color: #fff;
    border-color: #76839b !important;

    :hover {
      background-color: #76839b;
      border-color: #76839b !important;
    }
  }
`
