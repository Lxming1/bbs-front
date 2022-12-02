import { Select, DatePicker, Radio, Button } from 'antd'
import { memo, useEffect, useState } from 'react'
import { useStoreInfo } from '../../../hooks'
import { editUserInfo, getAddress, uploadAvatar } from '../../../service/users'
import EditWrapper from './style'
import { CameraFilled, EditFilled } from '@ant-design/icons'
import dayjs from 'dayjs'
import { xmMessage } from '../../../utils'

export default memo(() => {
  const { user } = useStoreInfo('user')
  const [cityData, setCityData] = useState([])
  const [provinceData, setProvinceData] = useState([])
  const [citiesData, setCitiesData] = useState([])
  const [cities, setCities] = useState()
  const [secondCity, setSecondCity] = useState()
  const [profileInfo, setProfileInfo] = useState({})
  const [address, setAddress] = useState({})

  const handleProvinceChange = (value) => {
    const res = cityData.find((item) => item.id == value)
    setCities(res.children)
    setSecondCity(res.children[0])
  }

  const onSecondCityChange = (value) => {
    setSecondCity(cities.find((item) => item.id === value))
  }

  const changeGender = (e) => {
    const newInfo = { ...profileInfo }
    newInfo.gender = e.target.value
    console.log(newInfo)
    setProfileInfo(newInfo)
  }

  const editBtn = (fn) => (
    <span className="editName" onClick={fn}>
      <EditFilled />
      修改
    </span>
  )

  const upload = async (e) => {
    const fileList = e.target.files
    const reg = new RegExp(/^image\/(jpe?g|png|gif|svg)$/)
    if (fileList.length) {
      if (reg.test(fileList[0].type)) {
        const form = new FormData()
        form.append('avatar', fileList[0])
        const result = await uploadAvatar(form)
        xmMessage(result.code, result.message)
        window.location.reload()
      }
    }
  }

  const save = async () => {
    const { name, birthday, gender, introduction } = profileInfo
    const result = await editUserInfo({
      address: secondCity.id,
      name,
      birthday: birthday.substring(0, 9),
      gender,
      introduction,
    })
    xmMessage(result.code, result.message)
  }

  useEffect(() => {
    setProfileInfo({
      name: user?.name,
      gender: user?.gender,
      introduction: user?.introduction,
      birthday: user?.birthday,
    })
    setAddress({
      province: user?.address?.parent,
      city: user?.address?.children,
    })
  }, [user])

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
      <div style={{ display: 'flex' }}>
        <div className="left">
          <label htmlFor="avatar">
            <div className="avatar">
              <img src={user.avatar_url} alt="" />
              <div className="avatarWrapper"></div>
              <div className="tips">
                <CameraFilled />
                <div>修改我的头像</div>
              </div>
            </div>
          </label>
          <input type="file" hidden id="avatar" onChange={upload} />
        </div>
        <div className="right">
          <div className="name">
            {profileInfo.name}
            {editBtn()}
          </div>
          <ul className="editBox">
            <li>
              <span className="key">性别</span>
              <span className="value">
                <Radio.Group onChange={changeGender} value={profileInfo.gender}>
                  <Radio value={0}>男</Radio>
                  <Radio value={1}>女</Radio>
                </Radio.Group>
              </span>
            </li>
            <li>
              <span className="key">个人简介</span>
              <span
                className="value"
                style={{ color: '#121212', fontSize: '15px', lineHeight: '20px' }}>
                {profileInfo?.introduction}
                {editBtn()}
              </span>
            </li>
            <li>
              <span className="key">出生日期</span>
              <span className="value">
                <DatePicker
                  defaultValue={
                    profileInfo?.birthday === null || profileInfo?.birthday === undefined
                      ? ''
                      : dayjs(profileInfo?.birthday, 'YYYY-MM-DD')
                  }
                />
              </span>
            </li>
            <li>
              <span className="key">居住地</span>
              <span className="value">
                <Select
                  defaultValue={address?.province?.name ?? address?.city?.name}
                  style={{ width: 120, marginRight: '20px' }}
                  onChange={handleProvinceChange}
                  options={provinceData?.map((item) => ({ label: item.name, value: item.id }))}
                />
                <Select
                  defaultValue={address?.city?.name}
                  style={{ width: 120 }}
                  value={secondCity?.name}
                  options={cities?.map((item) => ({ label: item.name, value: item.id }))}
                  onChange={onSecondCityChange}
                />
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="save">
        <div className="sendBtn" onClick={save}>
          保存
        </div>
      </div>
    </EditWrapper>
  )
})
