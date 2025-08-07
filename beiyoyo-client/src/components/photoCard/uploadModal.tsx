import { PlusOutlined } from "@ant-design/icons"
import { Form, Input, Modal, Upload, } from "antd"
import userStore from "@/stores/userStore"
import { useState } from "react"
import { useAppContext } from "@/context"
type Props = {
  visible: boolean
  onCancel: () => void
}
type FormValue = {
  subject: string,
  description: string,
  photo: File
}
export const UploadModal = (props: Props) => {
  const { visible, onCancel } = props
  const [form] = Form.useForm()
  const { uploadPic } = userStore
  const [loading, setLoading] = useState(false)
  const { messageApi } = useAppContext()

  return (
    <Modal
      title='上传图片'
      onCancel={() => { onCancel() }}
      open={visible}
      okText='确认'
      cancelText='取消'
      onOk={async () => {
        await form.validateFields()
        const values = await form.getFieldsValue()
        const fileObj = values.photo?.fileList[0]?.originFileObj
        setLoading(true)
        try {
          await uploadPic(
            {
              subject: values.subject,
              description: values.description,
              photo: fileObj,
            }
          )
          setLoading(false)
          onCancel()
          messageApi.success('上传成功！')
        } catch (e) {
          messageApi.error(`${e}`)
          setLoading(false)
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
        clearOnDestroy
      >
        <Form.Item
          name='subject'
          label='图片名称'
          required
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='description'
          label='图片描述'
          required
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name='photo'
          label='图片'
          required
        >
          <Upload
            listType="picture-card"
            beforeUpload={() => false} // ✅ 阻止自动上传
            maxCount={1}
          >
            <button style={{ border: 0, background: 'none' }} type="button">
              <PlusOutlined className="!text-[30px] cursor-pointer !text-[#646a73]" />
            </button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  )
}