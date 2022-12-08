import styled from 'styled-components'

export default styled.div`
  .delDialogGroup {
    box-sizing: border-box;
    width: 328px !important;
    box-sizing: content-box;
    text-align: center;
    padding: 24px 36px;

    .delTitle {
      box-sizing: border-box;
      color: #121212;
      margin: 0px;
      min-width: 0px;
      font-size: 18px;
      line-height: 28px;
      font-weight: 600;
      text-align: center;
    }

    .delAlert {
      margin-top: 16px;
      font-size: 14px;
    }

    .delDesc {
      color: #999;
      margin-top: 6px;
      font-size: 14px;
    }

    .delBtn {
      display: flex;
      justify-content: space-between;
      margin-top: 16px;

      .btn {
        width: 162px;
      }
    }
  }
  .dialogGroup {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 536px;
    background-color: white;
    overflow: auto;
    border-radius: 2px;

    .close {
      position: absolute;
      cursor: pointer;
      font-size: 21px;
      right: 10px;
      top: 10px;
    }

    .collect {
      .title {
        margin-top: 40px;
        color: #121212;
        font-size: 24px;
        font-weight: 500;
        text-align: center;
      }

      .desc {
        color: #8590a6;
        font-size: 14px;
        line-height: 1.5;
        margin-top: 4px;
        padding: 0 38px;
        text-align: center;
      }

      .btnGroup {
        margin-top: 40px;
        margin-bottom: 48px;
        flex: 1 1;
        line-height: 1.7;
        opacity: 1;
        display: flex;
        justify-content: end;
        flex-direction: column;
        align-items: center;
      }
    }

    .list {
      padding: 0 24px;
      margin-top: 24px;
      margin-bottom: 40px;
      max-height: 335px;
      min-height: 140px;
      overflow-x: hidden;
      overflow-y: auto;

      .item {
        align-items: center;
        border-bottom: 1px solid #ebebeb;
        display: flex;
        justify-content: space-between;
        padding: 8px 0;

        .left {
          margin-right: 20px;

          .name {
            font-weight: 700;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 15px;
          }

          .count {
            margin-top: 4px;
            color: #8590a6;
            font-size: 14px;
          }
        }

        .collectBtn {
          width: 74px;
          height: 32px;
          text-align: center;
          border-color: #056de8;
          color: #056de8;

          :hover {
            background-color: rgba(5, 109, 232, 0.06);
          }
        }

        .collectedBtn {
          width: 74px;
          line-height: 32px;
          text-align: center;
          background-color: #8590a6;
          color: #fff;

          :hover {
            background-color: #76839b;
          }
        }
      }
    }

    .btn {
      background: none;
      border: 1px solid;
      border-radius: 3px;
      cursor: pointer;
      display: inline-block;
      font-size: 14px;
      line-height: 32px;
      text-align: center;
      padding: 0;
    }

    .create {
      width: 220px;
      background-color: #056de8;
      color: #fff;

      :hover {
        background-color: #0461cf;
      }
    }

    .cancel {
      color: #8590a6;
      width: 220px;
      margin-top: 30px;
    }

    .back {
      color: #8590a6;
      width: 220px;
    }
    .title {
      margin-top: 40px;
      color: #121212;
      font-size: 20px;
      font-weight: 500;
      text-align: center;
    }
    .createCollect {
      padding: 0 24px 32px 24px;
      margin-top: 24px;

      .setVisiable {
        margin-top: 20px;
        .tips {
          color: #8590a6;
          margin-left: 4px;
        }
      }

      .createBtn {
        display: flex;
        margin-top: 28px;
        justify-content: space-between;
      }
    }
  }
`
