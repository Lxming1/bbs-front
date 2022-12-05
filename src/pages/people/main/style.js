import styled from 'styled-components'

export default styled.div`
  width: 1000px;
  margin: 0 auto;
  margin-top: 10px;
  display: flex;

  .leftContent {
    background-color: #fff;
    width: 694px;
    margin-right: 10px;

    .tabs {
      height: 51px;
      border-bottom: 1px solid #f6f6f6;
      display: flex;
      color: #121212;
      font-size: 16px;

      li {
        padding: 0 12px;
        cursor: pointer;

        span {
          color: #121212;
          display: inline-block;
          line-height: 22px;
          padding: 14px 0;
          text-align: center;
          position: relative;
        }

        .tabs-active {
          font-synthesis: style;
          font-weight: 600;

          ::after {
            background: #056de8;
            bottom: -1px;
            content: '';
            height: 3px;
            left: 0;
            position: absolute;
            right: 0;
          }
        }
      }
    }

    .people-header {
      display: flex;
      color: #121212;
      height: 50px;
      line-height: 50px;
      margin-left: 20px;
      border-bottom: 1px solid #f6f6f6;
      font-size: 15px;

      .head-active {
        font-weight: 600;
        cursor: pointer;
      }

      div {
        margin-right: 36px;
      }
    }
  }

  .rightContent {
    background-color: #fff;
    width: 296px;
    padding: 10px;
  }
`
