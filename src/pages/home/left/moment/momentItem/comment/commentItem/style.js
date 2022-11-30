import styled from 'styled-components'

export default styled.div`
  .item {
    padding: 10px 20px 14px 20px;
    display: flex;

    .leftAvatar {
      width: 24px;
      height: 24px;
      border-radius: 3px;
    }

    .rightContent {
      margin-left: 10px;
      flex: 1;

      .rightHeader {
        display: flex;
        justify-content: space-between;

        .username {
          font-size: 15px;
          line-height: 20px;
          color: #444;
          font-weight: bold;
          span {
            margin: 0 3px;
          }
        }
      }

      .content {
        font-size: 15px;
        color: #444;
        line-height: 21px;
        margin-top: 4px;
      }

      .bottom {
        display: flex;
        justify-content: space-between;
        width: 100%;
        align-items: center;
        margin-bottom: 5px;

        .time {
          font-size: 14px;
          color: #999;
        }

        .btn {
          color: #8590a6;
          font-size: 14px;
          display: flex;

          .isPraise {
            color: #056de8;
          }

          div {
            cursor: pointer;
            margin-left: 15px;

            svg {
              margin-right: 5px;
            }
          }
        }
      }
    }
  }
`
