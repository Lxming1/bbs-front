import styled from 'styled-components'
export const MomentItemWrapper = styled.div`
  border-bottom: 1px solid #f0f2f7;
  padding: 20px;

  .openContent {
    width: 80px;
    height: 24px;
    line-height: 24px;
    cursor: pointer;
    color: #175199;
    margin-left: 4px;
    margin-bottom: 5px;
    font-size: 14px;

    :hover {
      color: grey;
    }
  }

  .closeContent {
    cursor: pointer;
    color: #8590a6;
    margin-left: 4px;
    font-size: 14px;

    svg {
      margin-left: 5px;
    }

    :hover {
      color: #76839b;
    }
  }

  .title {
    color: #121212;
    font-size: 18px;
    line-height: 1.6;
    font-synthesis: style;
    font-weight: 600;
  }

  .author {
    display: flex;
    margin-top: 10px;

    .avatar {
      height: 24px;
      width: 24px;

      img {
        height: 100%;
        width: 100%;
      }
    }

    .name {
      color: #444;
      font-size: 15px;
      font-synthesis: style;
      font-weight: 600;
      margin-left: 10px;
      line-height: 24px;
    }

    .introduction {
      color: #646464;
      line-height: 24px;
    }
  }

  .praise {
    color: #8590a6 !important;
    cursor: pointer;
    font-size: 14px;
    margin-top: 16px;
    margin-bottom: 10px;
  }

  .contentBox {
    cursor: pointer;

    .hiddenContent {
      //文本超出部分以...形式展示
      text-overflow: -o-ellipsis-lastline;
      //整体超出部分隐藏
      overflow: hidden;
      //文本超出部分以...形式展示，同第一行样式代码
      text-overflow: ellipsis;
      //display 块级元素展示
      display: -webkit-box;
      //设置文本行数为2行
      -webkit-line-clamp: 2;
      //设置文本行数为2行
      line-clamp: 2;
      //从上到下垂直排列子元素（设置伸缩盒子的子元素排列方式）
      -webkit-box-orient: vertical;

      .seize {
        width: 200px;
      }
    }

    :hover {
      color: #646464;
    }
  }

  .contentBox {
    cursor: pointer;

    .hiddenContent {
      //文本超出部分以...形式展示
      text-overflow: -o-ellipsis-lastline;
      //整体超出部分隐藏
      overflow: hidden;
      //文本超出部分以...形式展示，同第一行样式代码
      text-overflow: ellipsis;
      //display 块级元素展示
      display: -webkit-box;
      //设置文本行数为2行
      -webkit-line-clamp: 2;
      //设置文本行数为2行
      line-clamp: 2;
      //从上到下垂直排列子元素（设置伸缩盒子的子元素排列方式）
      -webkit-box-orient: vertical;

      .seize {
        width: 200px;
      }
    }

    :hover {
      color: #646464;
    }
  }

  .hasPicBox {
    cursor: pointer;
    display: grid;
    grid-template-columns: 200px 1fr;
    margin-bottom: 10px;
    margin-top: 1px;

    .img {
      border-radius: 4px;
      height: 105px;
      width: 190px;
      overflow: hidden;

      img {
        width: 190px;
      }
    }

    .hasPicContent {
      padding-top: 5px;
      padding-left: 10px;
    }

    .hiddenContent {
      //文本超出部分以...形式展示
      text-overflow: -o-ellipsis-lastline;
      //整体超出部分隐藏
      overflow: hidden;
      //文本超出部分以...形式展示，同第一行样式代码
      text-overflow: ellipsis;
      //display 块级元素展示
      display: -webkit-box;
      //设置文本行数为2行
      -webkit-line-clamp: 4;
      //设置文本行数为2行
      line-clamp: 4;
      //从上到下垂直排列子元素（设置伸缩盒子的子元素排列方式）
      -webkit-box-orient: vertical;

      .seize {
        width: 200px;
      }
    }

    :hover {
      color: #646464;
    }
  }

  .content {
    font-size: 15px;
    line-height: 1.6;
  }

  .picture {
    margin-top: 10px;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 215px);
    grid-gap: 5px;

    .imgBox {
      width: 215px;
      height: 215px;
      overflow: hidden;
      border-radius: 2px;

      img {
        width: 215px;
      }
    }
  }

  .createTime {
    color: #8590a6;
    font-size: 14px;
    margin-top: 10px;
    margin-bottom: 10px;
    height: 22px;
    line-height: 22px;
  }

  .bottomBtn {
    color: #8590a6;
    display: flex;
    font-size: 14px;

    .praiseBtn {
      height: 32px;
      padding: 0 12px;
      background: rgba(5, 109, 232, 0.1);
      color: #056de8;
      border: 1px solid;
      border-radius: 3px;
      border-color: transparent;

      :hover {
        background-color: rgba(5, 109, 232, 0.15);
        color: #056de8;
      }
    }

    .praiseBtn-active {
      height: 32px;
      padding: 0 12px;
      background: #056de8;
      border: 1px solid;
      border-radius: 3px;
      border-color: transparent;
      color: #fff;

      :hover {
        background: #056de8;
        color: #fff;
      }
    }

    div {
      line-height: 32px;
      cursor: pointer;
      margin-right: 50px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      svg {
        margin-right: 5px;
      }

      :hover {
        color: #76839b;
      }
    }
  }
`
