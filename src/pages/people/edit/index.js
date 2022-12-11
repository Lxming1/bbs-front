import { Select, DatePicker, Radio, Button, Input } from 'antd'
import dayjs from 'dayjs'
import { memo, useEffect, useState, useRef } from 'react'
import { useStoreInfo } from '@/hooks'
import { editUserInfo, getAddress, uploadAvatar } from '@/service/users'
import EditWrapper from './style'
import { CameraFilled, EditFilled, RightOutlined, RollbackOutlined } from '@ant-design/icons'
import { xmMessage, verifyName } from '@/utils'
import { handleUserMes, setUserMes } from '../../../store/actionCreater/authActions'
import { useDispatch } from 'react-redux'
import { verifyLogin } from '../../../utils'

export default memo(() => {
  const { user, isLogin } = useStoreInfo('user', 'isLogin')
  const [cityData, setCityData] = useState([])
  const [isBadName, setIsBadName] = useState(false)
  const [provinceData, setProvinceData] = useState([])
  const [cities, setCities] = useState()
  const [secondCity, setSecondCity] = useState()
  const [profileInfo, setProfileInfo] = useState({})
  const [address, setAddress] = useState({})
  const nameRef = useRef(null)
  const dispatch = useDispatch()
  const nameTip = '限16个字符，支持中英文、数字、下划线'

  const handleProvinceChange = (value) => {
    if (value === undefined) {
      setCities([])
      setSecondCity({ id: 0, name: '' })
      return
    }
    const res = cityData.find((item) => item.id == value)
    setCities(res.children)
    setSecondCity(res.children[0])
  }

  const onSecondCityChange = (value) => {
    setSecondCity(cities.find((item) => item.id === value))
  }
  const changeGender = (e) => {
    setProfileInfo({
      ...profileInfo,
      gender: {
        value: e.target.value,
        state: true,
      },
    })
  }
  const editFn = (key, state) => {
    if (!state) {
      if (key === 'address') {
        setAddress({
          value: {
            province: user?.address?.parent,
            city: user?.address?.children,
          },
          state,
        })
        return
      }
      setProfileInfo({
        ...profileInfo,
        [key]: {
          state,
          value: user[key],
        },
      })
    } else {
      if (key === 'address') {
        setAddress({
          value: address.value,
          state,
        })
        return
      } else if (key === 'birthday') {
        setProfileInfo({
          ...profileInfo,
          [key]: {
            state,
            value: null,
          },
        })
        return
      }
      setProfileInfo({
        ...profileInfo,
        [key]: {
          state,
          value: profileInfo[key].value,
        },
      })
    }
  }

  const editBtn = (key) => (
    <span className="editName" onClick={() => editFn(key, true)}>
      <EditFilled />
      修改
    </span>
  )

  const cancel = (key) => (
    <span className="cancelEdit" onClick={() => editFn(key, false)}>
      取消
    </span>
  )

  const changeName = (e) => {
    const value = e.target.value
    setProfileInfo({
      ...profileInfo,
      name: {
        value,
        state: true,
      },
    })
    setIsBadName(!verifyName(value))
  }

  const upload = async (e) => {
    const fileList = e.target.files
    const reg = new RegExp(/^image\/(jpe?g|png|gif|svg)$/)
    if (fileList.length) {
      if (reg.test(fileList[0].type)) {
        const form = new FormData()
        form.append('avatar', fileList[0])
        const result = await uploadAvatar(form)
        dispatch(setUserMes({ ...user, avatar_url: result.data }))
        xmMessage(result.code, result.message)
      }
    }
  }

  const changeBrithday = (value) => {
    if (value === null) {
      setProfileInfo({
        ...profileInfo,
        birthday: {
          value,
          state: true,
        },
      })
      return
    }
    const birthday = dayjs(value._d.getTime()).format('YYYY-MM-DD')
    setProfileInfo({
      ...profileInfo,
      birthday: {
        value: birthday,
        state: true,
      },
    })
  }
  const save = async () => {
    const { name, birthday, gender, introduction } = profileInfo
    if (isBadName) return nameRef.current.focus()
    const result = await editUserInfo({
      address:
        secondCity?.id === 0
          ? null
          : secondCity?.id
          ? secondCity?.id
          : user?.address?.children?.id
          ? user?.address?.children?.id
          : null,
      name: name.value,
      birthday: birthday?.value?.substring(0, 10) ?? null,
      gender: gender.value,
      introduction: introduction.value,
    })
    xmMessage(result.code, result.message)
    dispatch(handleUserMes(result.data))
  }

  const changeIntroduction = (e) => {
    const value = e.target.value
    setProfileInfo({
      ...profileInfo,
      introduction: {
        value,
        state: true,
      },
    })
  }

  const disableControl = () =>
    Object.keys(profileInfo).some((key) => profileInfo[key].state) || address?.state

  useEffect(() => {
    setProfileInfo({
      name: {
        state: false,
        value: user?.name,
      },
      gender: {
        state: false,
        value: user?.gender,
      },
      introduction: {
        state: false,
        value: user?.introduction,
      },
      birthday: {
        state: false,
        value: user?.birthday,
      },
    })
    setAddress({
      state: false,
      value: {
        province: user?.address?.parent,
        city: user?.address?.children,
      },
    })
  }, [user])

  useEffect(() => {
    verifyLogin(isLogin).then(() => {
      getAddress().then(({ data: result }) => {
        setCityData(result)
        setProvinceData(
          result.map((item) => ({
            id: item.id,
            name: item.name,
          }))
        )
      })
    })
  }, [])
  return (
    <EditWrapper className="boxShadow">
      <div style={{ display: 'flex' }}>
        <div className="left">
          <label htmlFor="avatar">
            <div className="avatar">
              <img src={user?.avatar_url} alt="" />
              <div className="avatarWrapper" />
              <div className="tips">
                <CameraFilled />
                <div>修改我的头像</div>
              </div>
            </div>
          </label>
          <input type="file" hidden id="avatar" onChange={upload} />
        </div>
        <div className="right">
          <a href={`#/people/${user?.id}`} className="back">
            返回我的主页 <RightOutlined />
          </a>
          <div className="name">
            {profileInfo?.name?.state ? (
              <>
                <Input
                  className={!isBadName ? 'Input' : ''}
                  value={profileInfo.name.value}
                  onChange={changeName}
                  style={{ width: '250px' }}
                  bordered={isBadName}
                  status={isBadName && 'error'}
                  ref={nameRef}
                />
                {isBadName && <span className="nameTip">{nameTip}</span>}
                {cancel('name')}
              </>
            ) : (
              <div>
                {profileInfo?.name?.value}
                {editBtn('name')}
              </div>
            )}
          </div>
          <ul className="editBox">
            <li>
              <span className="key">性别</span>
              <span className="value">
                {profileInfo?.gender?.state ? (
                  <>
                    <Radio.Group onChange={changeGender} value={profileInfo.gender?.value}>
                      <Radio value={0}>男</Radio>
                      <Radio value={1}>女</Radio>
                    </Radio.Group>
                    {cancel('gender')}
                  </>
                ) : (
                  <div>
                    {!profileInfo.gender?.value ? '男' : '女'} {editBtn('gender')}
                  </div>
                )}
              </span>
            </li>
            <li>
              <span className="key">个人简介</span>
              <span className="value">
                {profileInfo?.introduction?.state ? (
                  <>
                    <Input.TextArea
                      allowClear
                      maxLength={30}
                      showCount
                      bordered={null}
                      autoSize={{ minRows: 2, maxRows: 6 }}
                      className="Input"
                      defaultValue={profileInfo?.introduction?.value}
                      onChange={changeIntroduction}
                    />
                    {cancel('introduction')}
                  </>
                ) : (
                  <div>
                    {profileInfo?.introduction?.value}
                    {editBtn('introduction')}
                  </div>
                )}
              </span>
            </li>
            <li>
              <span className="key">出生日期</span>
              <span className="value">
                {profileInfo?.birthday?.state ? (
                  <>
                    <DatePicker onChange={changeBrithday} />
                    {cancel('birthday')}
                  </>
                ) : (
                  <div>
                    {profileInfo?.birthday?.value?.substring(0, 10)}
                    {editBtn('birthday')}
                  </div>
                )}
              </span>
            </li>
            <li>
              <span className="key">居住地</span>
              <span className="value">
                {address?.state ? (
                  <>
                    <Select
                      defaultValue={address?.value?.province?.name ?? address?.value?.city?.name}
                      style={{ width: 120, marginRight: '20px' }}
                      onChange={handleProvinceChange}
                      allowClear
                      options={provinceData?.map((item) => ({ label: item.name, value: item.id }))}
                    />
                    <Select
                      defaultValue={address?.value?.city?.name}
                      style={{ width: 120 }}
                      value={secondCity?.name}
                      options={cities?.map((item) => ({ label: item.name, value: item.id }))}
                      onChange={onSecondCityChange}
                    />
                    {cancel('address')}
                  </>
                ) : (
                  <div>
                    {(address?.value?.province?.name ?? address?.value?.city?.name) && (
                      <>
                        <span style={{ marginRight: '10px' }}>
                          {address?.value?.province?.name}
                        </span>
                        <span>{address?.value?.city?.name}</span>
                      </>
                    )}

                    {editBtn('address')}
                  </div>
                )}
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="save">
        <button
          className={'sendBtn ' + (!disableControl() ? 'disableBtn' : '')}
          disabled={!disableControl()}
          onClick={save}>
          保存
        </button>
      </div>
    </EditWrapper>
  )
})
