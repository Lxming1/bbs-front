import styled from 'styled-components'

export default styled.div`
  position: sticky;
  top: 70px;

  .topContent {
    background-color: #fff;
    .title {
      line-height: 50px;
      padding: 0 20px;
      font-synthesis: style;
      font-weight: 600;
      font-size: 15px;
      border-bottom: 1px solid #f6f6f6;
      color: #646464;
    }

    .achievement {
      padding: 12px 0;

      .detail {
        display: flex;
        padding: 6px 20px;

        .detailLeft {
          svg {
            color: #646464;
            margin-right: 8px;
            font-size: 16px;
            margin-top: 3px;
          }
        }

        .detailRight {
          .detailTitle {
            color: #646464;
            font-size: 15px;
          }
          .detailDesc {
            font-size: 14px;
            color: #8590a6;
            margin-top: 6px;
          }
        }
      }
    }
  }

  .followInfo {
    background-color: #fff;
    margin-top: 10px;
    display: flex;

    .box {
      text-align: center;
      padding: 12px 0;
      flex: 1;
      cursor: pointer;

      .title {
        color: #8590a6;
        font-size: 14px;
      }

      .count {
        font-synthesis: style;
        font-weight: 600;
        color: #121212;
        display: inline-block;
        font-size: 18px;
      }

      :hover {
        .title,
        .count {
          color: #175199 !important;
        }
      }
    }
  }
`
