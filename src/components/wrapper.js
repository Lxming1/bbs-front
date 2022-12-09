import { memo } from 'react'

export default memo(({ hidden }) => {
  const style = {
    position: 'fixed',
    left: '0',
    top: '0',
    right: '0',
    bottom: '0',
    backgroundColor: 'hsla(0, 0%, 7%, 0.45)',
    transition: 'background-color 0.3s ease-out',
    zIndex: '1',
  }
  return <div onClick={hidden && hidden} style={style}></div>
})
