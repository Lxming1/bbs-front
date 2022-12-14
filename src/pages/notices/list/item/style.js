import styled from 'styled-components'

export default styled.div`
  padding: 24px 0;
  position: relative;

  :not(:last-child)::after {
    content: '';
    display: block;
    width: 100%;
    width: calc(100% - 44px);
    height: 1px;
    border-bottom: 1px solid #e5e9ef;
    position: absolute;
    bottom: 0;
    left: 60px;
  }

  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .hidden {
      display: none;
    }

    :hover {
      .hidden {
        display: block;
      }
    }

    .left {
      display: flex;
      flex: 1;

      .spot {
        position: absolute;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: #ff4d4f;
        right: -8px;
        top: 10px;
      }

      .leftAvatar {
        width: 46px;
        height: 46px;
        border-radius: 50%;
        margin-right: 14px;
        overflow: hidden;
        cursor: pointer;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .leftDesc {
        flex: 1;

        .nameHeader {
          flex: 1;
          display: flex;
          font-size: 14px;
          margin-bottom: 10px;
          line-height: 19.2px;

          .name {
            color: #222;
            margin-right: 8px;
            font-weight: bold;
            cursor: pointer;
          }

          .action {
            color: #505050;
          }
        }

        .content {
          flex: 1;
          color: #222;
          font-size: 14px;
          line-height: 19.2px;
          margin-bottom: 10px;
          margin-right: 14px;
        }

        .noticeBottom {
          display: flex;
          align-items: center;
          color: #999;

          .isPraise {
            color: #056de8;
          }

          .button {
            :hover {
              color: #056de8;
            }
          }

          > div {
            margin-right: 15px;
            font-size: 13px;
            cursor: pointer;

            svg {
              margin-right: 3px;
            }
          }

          .time {
            font-size: 12px;
            line-height: 22px;
          }
        }
      }
    }

    .right {
      width: 60px;
      height: 60px;
      cursor: pointer;
      color: #999;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-word;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      font-size: 14px;
      line-height: 15px;
      max-height: 4.285714285714286em;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .followBtn {
      > button {
        height: 34px;
        border-color: #056de8;
        text-decoration: none;
        padding: 0 16px;
        width: auto !important;
        font-weight: 500;

        svg {
          font-size: 16px;
          margin-right: 6px;
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
    }
  }

  .replyInput {
    margin-top: 10px;
    display: flex;
    align-items: center;
    margin: 10px 58px 0 58px;
  }
`
