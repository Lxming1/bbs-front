import styled from 'styled-components'

export default styled.div`
  display: flex;
  margin: 0 auto;
  width: 980px;

  .leftNav {
    width: 140px;
    background-color: white;
    margin-top: 10px;
    min-height: calc(100vh - 80px);
    margin-right: 10px;

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

    .title {
      margin-top: 10px;
      line-height: 42px;
      padding: 0 16px;
      background-color: #fff;
      color: #666;
      font-size: 15px;
      width: 100%;
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
