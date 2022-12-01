import styled from 'styled-components'

export default styled.div`
  width: 1000px;
  padding: 20px;
  background-color: #fff;
  margin: 0 auto;
  margin-top: 40px;
  display: flex;

  .left {
    position: relative;
    .avatar {
      width: 160px;
      height: 160px;
      box-sizing: content-box;
      border: 4px solid #fff;
      border-radius: 8px;
      background-color: #fff;
      position: relative;
      top: -45px;

      img {
        border-radius: 4px;
        height: 100%;
        width: 100%;
      }
    }
  }

  .right {
    padding-left: 32px;
    padding-top: 16px;

    .name {
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      display: inline-block;
      font-size: 26px;
      font-synthesis: style;
      font-weight: 600;
      max-width: 320px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
`
