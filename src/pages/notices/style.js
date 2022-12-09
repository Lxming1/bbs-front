import styled from 'styled-components'

export default styled.div`
  display: flex;
  margin: 0 auto;
  width: 980px;
  position: relative;
  top: 60px;

  .leftNav {
    width: 140px;
    background-color: white;
    height: calc(100vh - 80px);
    position: fixed;
    top: 70px;

    .title {
      line-height: 62px;
      font-size: 14px;
      font-weight: 700;
      color: #333;
      text-align: center;

      svg {
        margin-right: 3px;
      }
    }

    ul {
      padding-left: 20px;

      .active {
        a {
          color: #056de8;
        }

        ::before {
          content: '';
          display: inline-block;
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #056de8;
          margin-top: -4px;
          top: 50%;
          margin-right: 5px;
        }
      }

      li {
        font-size: 14px;
        position: relative;

        .count {
          position: absolute;
          height: 14px;
          line-height: 14px;
          left: 82px;
          top: 13px;
          padding: 0 8px;
          font-size: 12px;
          color: #fff;
          font-weight: normal;
          font-size: 12px;
          white-space: nowrap;
          text-align: center;
          background: #ff4d4f;
          border-radius: 10px;
          box-shadow: 0 0 0 1px #fff;
        }

        :hover {
          a {
            color: #056de8;
          }

          ::before {
            content: '';
            display: inline-block;
            position: absolute;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: #056de8;
            margin-top: -4px;
            top: 50%;
            margin-right: 5px;
          }
        }

        a {
          line-height: 40px;
          display: inline-block;
          width: 100%;
          padding-left: 20px;
          font-weight: 700;
        }

        ::before {
          content: '';
          display: inline-block;
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #333;
          margin-top: -4px;
          top: 50%;
          margin-right: 5px;
        }
      }
    }
  }

  .rightContent {
    width: 820px;
    margin-left: 150px;

    .title {
      margin-top: 10px;
      line-height: 42px;
      padding: 0 16px;
      background-color: #fff;
      color: #666;
      font-size: 15px;
      width: 820px;
      font-weight: 600;
    }

    .mainContent {
      background-color: white;
      padding: 0 16px;
      margin-top: 10px;
      min-height: calc(100vh - 132px);
      position: relative;
    }
  }
`
