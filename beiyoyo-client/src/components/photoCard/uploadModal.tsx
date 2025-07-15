import { InboxOutlined } from "@ant-design/icons"
import { message, Modal, type UploadProps } from "antd"
import Dragger from "antd/es/upload/Dragger"
type Props = {
  visible: boolean
  onCancel: (visible: boolean) => void

}
export const UploadModal = (props: Props) => {
  const { visible, onCancel } = props
  const uploadProps: UploadProps = {
    name: 'file',
    multiple: true,
    action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };
  return (
    <Modal
      title='上传图片'
      onCancel={() => { onCancel(false) }}
      open={visible}
      okText='确认'
      cancelText='取消'
    >
      <Dragger {...uploadProps}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="text-[#646a73]">单击或拖动文件到此区域进行上传</p>
      </Dragger>
    </Modal>
  )
}