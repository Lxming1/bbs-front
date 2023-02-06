import styled from 'styled-components'

export default styled.div`
  width: 296px;
  position: fixed;
  margin-left: 704px;
  z-index: 0;

  .rightOne {
    background-color: white;
    text-align: center;
    padding: 10px;

    button {
      margin-left: 0;
    }
  }

  .userToplist {
    width: 100%;
    height: 222.2px;
    margin-top: 10px;
    background-color: white;
    padding: 15px;

    .header {
      line-height: 19.2px;
      margin-bottom: 23px;
      font-size: 14px;
      color: #444;
      display: flex;
      align-items: center;

      svg {
        margin-right: 7px;
        font-size: 16px;
      }
    }

    ul {
      li {
        display: flex;
        justify-content: space-between;
        height: 38px;
        margin-bottom: 12px;

        .left {
          display: flex;
          flex: 1;

          img {
            width: 38px;
            height: 38px;
            cursor: pointer;
          }

          .content {
            flex: 1;
            .name {
              font-size: 13px;
              color: #444;
              cursor: pointer;
            }
            .desc {
              font-size: 12px;
              color: #999;
            }
            span {
              display: block;
            }
            margin-left: 8px;
          }
        }

        .relation {
          display: flex;
          align-items: center;

          .btn {
            display: flex;
            align-items: center;
            color: #056de8;
            font-size: 12px;
            cursor: pointer;

            svg {
              margin-right: 3px;
              font-size: 14px;
            }
          }

          .blue {
            color: #056de8;
          }

          .gray {
            color: #8590a6;
          }
        }
      }
    }
  }

  .rightTwo {
    width: 100%;
    margin-top: 10px;
    background-color: white;

    ul {
      padding: 8px 0;
      li {
        height: 40px;

        a {
          height: 40px;
          display: flex;
          align-items: center;
          padding: 0 20px;
          color: #8590a6;
          font-size: 14px;
          justify-content: space-between;

          :hover {
            background: #f6f6f6;
            color: #76839b;

            .count {
              background-color: white;
            }
          }

          .title {
            display: flex;
            align-items: center;

            svg {
              font-size: 16px;
            }

            .label {
              margin: 0 10px;
            }
          }

          .count {
            font-size: 12px;
            color: #8590a6;
            background: #f6f6f6;
            border-radius: 2px;
            padding: 6px 10px;
            display: inline-block;
          }
        }
      }
    }
  }
`
