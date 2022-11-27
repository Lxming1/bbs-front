import styled from 'styled-components'

export default styled.div`
  width: 1000px;
  /* height: calc(100vh - 55px); */
  margin: 0 auto;

  .header {
    margin-top: 10px;
    background-color: white;
    height: 250px;
    padding: 24px;
    border-radius: 2px;

    .avatar {
      width: 160px;
      height: 160px;
      border: 4px solid #fff;
      border-radius: 8px;
      background-color: #fff;

      img {
        border-radius: 4px;
        height: 100%;
        width: 100%;
      }
    }
  }
`
