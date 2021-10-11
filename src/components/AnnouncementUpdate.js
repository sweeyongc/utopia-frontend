import { Form, Input, Button, Modal, message, Select } from "antd";
import { updateAnnouncement } from "../utils";

const AnnouncementUpdate = (props) => {
  const { Option } = Select;

  const onFinish = (values) => {
    updateAnnouncement({
      announcementId: props.curAnnouncement.announcementId,
      title: values.title,
      category: values.category,
      content: values.content,
    })
      .then(() => {
        props.onSuccess();
        message.success("Announcement has been successfully updated!");
      })
      .catch((err) => {
        message.error(err.message);
      });
  };

  return (
    <Modal
      title="Edit announcement"
      visible={props.displayModal}
      onCancel={props.onCancel}
      onSuccess={props.onSuccess}
      footer={null}
      destroyOnClose={true}
    >
      <Form
        name="AnnouncementUpdate"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please input the title." }]}
          initialValue={props.curAnnouncement.title}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true, message: "Please select a category." }]}
          initialValue={props.curAnnouncement.category}
        >
          <Select>
            <Option value="GENERAL_ANNOUNCEMENT">General announcement</Option>
            <Option value="COMMITTEE_MEETING">Committee meeting</Option>
            <Option value="MAINTENANCE_UPDATE">Maintenance update</Option>
            <Option value="OTHERS">Others</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="content"
          label="Description"
          rules={[
            { required: true, message: "Please input your description." },
          ]}
          initialValue={props.curAnnouncement.content}
        >
          <Input.TextArea autoSize={{ minRows: 7, maxRows: 12 }} />
        </Form.Item>

        <br />

        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AnnouncementUpdate;
