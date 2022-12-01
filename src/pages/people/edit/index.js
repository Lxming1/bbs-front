import { Select } from 'antd'
import { memo, useEffect, useState } from 'react'
import { useStoreInfo } from '../../../hooks'
import { getAddress } from '../../../service/users'
import EditWrapper from './style'

export default memo(() => {
  const { user } = useStoreInfo('user')
  const [cityData, setCityData] = useState([])
  const [provinceData, setProvinceData] = useState([])
  const [citiesData, setCitiesData] = useState([])
  const [cities, setCities] = useState()
  const [secondCity, setSecondCity] = useState()

  const handleProvinceChange = (value) => {
    const res = cityData.find((item) => item.id == value)
    setCities(res.children)
    console.log(res.children[0])
    setSecondCity(res.children[0].name)
  }

  const onSecondCityChange = (value) => {
    setSecondCity(value)
  }

  useEffect(() => {
    getAddress().then(({ data: result }) => {
      setCityData(result)
      setProvinceData(
        result.map((item) => ({
          id: item.id,
          name: item.name,
        }))
      )
    })
  }, [])
  return (
    <EditWrapper className="boxShadow">
      <div className="left">
        <div className="avatar">
          <img src={user.avatar_url} alt="" />
        </div>
      </div>
      <div className="right">
        <div className="name">{user.name}</div>
        <ul>
          <li>
            <span className="key">性别</span>
            <span className="value">{user.gender == 0 ? '男' : '女'}</span>
          </li>
          <li>
            <span className="key">个人简介</span>
            <span className="value">{user.intoduciton}</span>
          </li>
          <li>
            <span className="key">居住地</span>
            <span className="value">
              <Select
                defaultValue={user?.address?.parent}
                style={{ width: 120 }}
                onChange={handleProvinceChange}
                options={provinceData?.map((item) => ({ label: item.name, value: item.id }))}
              />
              <Select
                defaultValue={user?.address?.children}
                style={{ width: 120 }}
                value={secondCity}
                onChange={onSecondCityChange}
                options={cities?.map((item) => ({ label: item.name, value: item.id }))}
              />
            </span>
          </li>
        </ul>
      </div>
    </EditWrapper>
  )
})
