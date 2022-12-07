import styled from 'styled-components'

export default styled.div`
  width: 1000px;
  margin: 0 auto;
  margin-top: 10px;
  display: flex;

  .collectLeft {
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
    background-color: white;
    width: 243px;
    padding: 20px;
  }
`
