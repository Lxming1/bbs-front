import styled from 'styled-components'

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
    }
  }
  .active {
    color: #056de8 !important;
  }
`
