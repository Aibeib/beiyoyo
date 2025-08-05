import { useAppContext } from "@/context"
import type { UserStore } from "@/store/userStore"
import { SwapOutlined } from "@ant-design/icons"
import { Form, Input, message, Modal, Upload } from "antd"
import { useEffect, useState } from "react"

type Props = {
  visible: boolean
  onCancel: () => void
  userStore: UserStore
}
type FormValue = {
  nickName: string,
  avatar: File,
  backgroundImage: File
}
export const EditInfoModal = (props: Props) => {
  const { onCancel, visible, userStore } = props
  const { userInfo, updateUserInfo } = userStore
  const { messageApi } = useAppContext()
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  console.log(userInfo.nickName, 'nickName')
  const defaultAvatarFile = [
    {
      uid: '-1',
      name: userInfo.avatar.split('/').at(-1),
      status: 'done',
      url: userInfo.avatar,
    },
  ];
  const defaultBackgroundFile = [
    {
      uid: '1',
      name: userInfo.backgroundImage.split('/').at(-1),
      status: 'done',
      url: userInfo.backgroundImage,
    },
  ];

  useEffect(() => {
    form.setFieldsValue({
      nickName: userInfo.nickName,
      avatar: defaultAvatarFile,
      backgroundImage: defaultBackgroundFile,
    });
  }, [form, userInfo]);

  return (
    <Modal
      title='信息更改'
      onCancel={() => { onCancel() }}
      open={visible}
      okText='确认'
      cancelText='取消'
      onOk={async () => {
        await form.validateFields()
        const values = await form.getFieldsValue()
        console.log(values, 'values')
        const avatarFile = values.avatar[0]?.originFileObj
        const backgroundFile = values.backgroundImage[0]?.originFileObj
        const formData = new FormData()
        formData.append('avatar', avatarFile)
        formData.append('backgroundImage', backgroundFile)
        formData.append('nickName', values.nickName)
        try {
          setLoading(true)
          await updateUserInfo(formData)
          messageApi.success('更新成功！')
          setLoading(false)
          onCancel()
        } catch (e) {
          messageApi.error(`更新失败${e}`)
        }
      }}
      okButtonProps={{
        loading: loading
      }}
      destroyOnHidden
    >
      <Form<FormValue>
        form={form}
        layout="vertical"
      >

        <Form.Item
          name='avatar'
          label='头像'
          required
          valuePropName="fileList"
          getValueFromEvent={(e) => Array.isArray(e) ? e : e?.fileList}

        >
          <Upload
            listType="picture-card"
            beforeUpload={() => false} // ✅ 阻止自动上传
            maxCount={1}
          >
            <button style={{ border: 0, background: 'none' }} type="button">
              <SwapOutlined />
              <div style={{ marginTop: 8 }}>更换图片</div>
            </button>
          </Upload>
        </Form.Item>
        <Form.Item
          name='backgroundImage'
          label='背景图片'
          required
          valuePropName="fileList"
          getValueFromEvent={(e) => Array.isArray(e) ? e : e?.fileList}

        >
          <Upload
            listType="picture-card"
            beforeUpload={() => false} // ✅ 阻止自动上传
            maxCount={1}
          >
            <button style={{ border: 0, background: 'none' }} type="button">
              <SwapOutlined />
              <div style={{ marginTop: 8 }}>更换图片</div>
            </button>
          </Upload>
        </Form.Item>
        <Form.Item
          name='nickName'
          label='昵称'
          required
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}