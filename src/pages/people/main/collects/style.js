import styled from 'styled-components'

export default styled.div`
  .people-header {
    display: flex;
    color: #121212;
    height: 50px;
    line-height: 50px;
    margin-left: 20px;
    border-bottom: 1px solid #f6f6f6;

    .head-active {
      font-weight: 600;
      cursor: pointer;
    }

    div {
      margin-right: 36px;
    }
  }
  .newCollect {
    position: absolute;
    right: 0;
    margin-right: 0 !important;
    color: #056de8;
    cursor: pointer;

    :hover {
      color: #144583;
    }
    svg {
      margin-right: 5px;
    }
  }

  .people-collect {
    .collectItem {
      border-top: 1px solid #f0f2f7;
      padding: 20px;

      .collectItemTitle {
        color: #121212;
        line-height: 22px;
        font-size: 18px;
        font-synthesis: style;
        font-weight: 600;
        cursor: pointer;

        svg {
          color: #8590a6;
          font-size: 16px;
        }
      }

      .collectItemDetail {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 16px;
        font-size: 14px;
        color: #999;

        .operation {
          display: flex;
          font-size: 14px;
          color: #8590a6;
          margin-right: 200px;
          align-items: center;

          div {
            cursor: pointer;
            margin: 0 10px;

            svg {
              margin-right: 5px;
            }

            :hover {
              color: #76839b;
            }
          }
        }
      }
    }
  }
`
