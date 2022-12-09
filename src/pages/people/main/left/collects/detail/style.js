import styled from 'styled-components'

export default styled.div`
  width: 1000px;
  margin: 0 auto;
  position: relative;
  top: 70px;

  .collectLeft {
    float: left;
    width: 694px;
    margin-right: 10px;

    .collectHeader {
      background-color: white;
      padding: 24px 20px 20px 20px;

      .name {
        margin-top: 12px;
        font-size: 22px;
        line-height: 28px;
      }

      .desc {
        color: #999;
        font-size: 14px;
        margin-top: 16px;
        margin-bottom: 16px;
      }

      .collectItemDetail {
        font-size: 14px;
        color: #999;
        position: relative;
        right: 0;

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

    .collectMoments {
      background-color: white;
      margin-top: 10px;
      min-height: calc(100vh - 230px);
      position: relative;

      .collectCount {
        padding: 0 20px;
        font-synthesis: style;
        font-weight: 600;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 15px;
        line-height: 50px;
        border-bottom: 1px solid #f6f6f6;
      }
    }
  }

  .collectRight {
    float: left;
    margin-right: 50px;
    background-color: white;
    width: 243px;
    position: fixed;
    margin-left: 704px;

    .rightTitle {
      line-height: 50px;
      color: #121212;
      padding: 0 14px;
      font-size: 15px;
      font-weight: 600;
      border-bottom: 1px solid #f6f6f6;
    }

    .collects {
      .collectItem {
        padding: 12px 14px;
        box-shadow: 0 1px 1px hsl(0deg 0% 70% / 10%);

        .collectName {
          color: #175199;
          font-size: 14px;
          font-synthesis: style;
          font-weight: 600;
        }

        .collectDesc {
          font-size: 12px;
          margin-top: 6px;
          color: #8590a6;
        }
      }
    }
  }
`
