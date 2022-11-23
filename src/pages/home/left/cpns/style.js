import styled from 'styled-components'

export const MomentWrapper = styled.div`
  width: 750px;
  width: 100%;
  box-sizing: border-box;

  .title {
    color: #121212;
    font-size: 18px;
    line-height: 1.6;
    font-synthesis: style;
    font-weight: 600;
  }

  .name {
    color: #444;
    font-size: 15px;
    font-synthesis: style;
    font-weight: 600;
  }

  .praise {
    color: #8590a6;
    cursor: pointer;
    font-size: 14px;
  }

  .content {
    color: #121212;
    font-size: 15px;
  }

  .createTime {
    color: #8590a6;
    font-size: 14px;
    margin-top: 10px;
  }
`

export const MomentItemWrapper = styled.div`
  border-bottom: 1px solid #f0f2f7;
  padding: 20px;
`

export const HeadMenuWrapper = styled.div`
  border-bottom: 1px solid #f0f2f7;
  height: 58px;

  ul {
    display: flex;

    li {
      margin: 0 22px;
      font-size: 16px;
      line-height: 58px;
      cursor: pointer;

      :hover {
        color: #175199;
      }

      /* :active {
        color: #056de8;
      } */
    }
  }
`
