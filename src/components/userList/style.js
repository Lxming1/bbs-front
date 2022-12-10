import styled from 'styled-components'

export default styled.div`
  .userListItem {
    padding: 16px 20px;
    display: flex;
    height: 75px;
    box-sizing: content-box;
    justify-content: space-between;
    align-items: center;
    position: relative;

    ::after {
      border-bottom: 1px solid #f6f6f6;
      content: '';
      display: block;
      left: 0;
      margin: 0 20px;
      position: absolute;
      right: 0;
      top: 0;
    }

    .itemLeft {
      display: flex;
      .userLeft {
        margin-right: 16px;

        img {
          height: 60px;
          width: 60px;
          cursor: pointer;
        }
      }
      .userRight {
        .name {
          font-size: 18px;
          font-synthesis: style;
          font-weight: 600;
          color: #121212;
          cursor: pointer;
        }
        .intro {
          color: #646464;
          font-size: 15px;
        }
        .desc {
          font-size: 14px;
          color: #8590a6;
          margin-top: 5px;
        }
      }
    }

    .rightBtn {
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
    }
  }
`
