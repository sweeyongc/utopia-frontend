import { Button, Form, Input, Modal, message, Select } from "antd";
import { newAnnouncement } from "../utils";

// Contains admin's new announcement creation components
const NewAnnouncement = (props) => {
  const { Option } = Select;

  const onFinish = (values) => {
    newAnnouncement({
      title: values.title,
      category: values.category,
      content: values.content,
    })
      .then(() => {
        props.onSuccess();
        message.success("New announcement has been successfully created!");
      })
      .catch((err) => {
        message.error(err.message);
      });
  };

  return (
    <Modal
      title="Create new announcement"
      visible={props.displayModal}
      onCancel={props.onCancel}
      onSuccess={props.onSuccess}
      footer={null}
      destroyOnClose={true}
    >
      <Form
        name="newAnnouncement"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please input the title." }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true, message: "Please select a category." }]}
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

export default NewAnnouncement;
