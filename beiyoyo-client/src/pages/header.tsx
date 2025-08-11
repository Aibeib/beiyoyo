import { CloudUploadOutlined, MoonFilled, SunFilled } from "@ant-design/icons"
import { Avatar } from "antd"
import { UserInfo } from "./userInfo"
import { UploadModal } from "@/components/photoCard/uploadModal"
import { useState } from "react"
import classNames from "classnames"
import { UIStore } from '@/stores/index'
import { Them } from "@/stores/type"
import { observer } from "mobx-react"

export const Header = observer(() => {
  const [visible, setVisible] = useState(false)
  const { setThem, them } = UIStore
  return <div className="flex justify-between w-full items-center">
    <Avatar
      src="../../public/logo_1.png"
      className=" demo-logo flex justify-center items-center"
      shape="square"
      size='large'
    />
    <div className="w-[calc(100%-32px)] flex justify-end items-center ">
      <CloudUploadOutlined onClick={() => setVisible(true)} className="text-[24px] !text-[gray] mr-3" />
      <div>
        <SunFilled
          className={
            classNames('mr-1 !text-[white]', {
              '!text-[gray]': them === Them.Light
            })
          }
          onClick={() => {
            setThem(Them.Light)
          }}
        />
        /
        <MoonFilled
          className={
            classNames("ml-1", {
              "!text-[white]": them === Them.Dark
            })
          }
          onClick={() => {
            setThem(Them.Dark)
          }}
        />
      </div>
      <div className="ml-3 flex items-center cursor-pointer">
        <UserInfo />
      </div>
    </div>
    <UploadModal visible={visible} onCancel={() => setVisible(false)} />
  </div>
})