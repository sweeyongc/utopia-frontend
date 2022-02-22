import React from "react";
import { Form, Input, Button, message, Modal, Select } from "antd";
import { newRequest } from "../utils";

// Contains user new request submission components
const NewRequest = (props) => {
  const onFinish = (data) => {
    newRequest(data)
      .then(() => {
        message.success(`New request is submitted!`);
        props.onSuccess();
      })
      .catch((err) => {
        props.onCancel();
        message.error(err.message);
      });
  };

  const { Option } = Select;

  return (
    <>
      <Modal
        title="New Request"
        visible={props.displayModal}
        onCancel={props.onCancel}
        footer={null}
        destroyOnClose={true}
      >
        <Form
          name="request"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          preserve={false}
        >
          <Form.Item
            name="title"
            label="Issue"
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
              <Option value="BOOK_FACILITIES">Book facilities</Option>
              <Option value="REQUEST_REPAIR">Request for repair</Option>
              <Option value="LODGE_COMPLAINT">Lodge a complaint</Option>
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

          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default NewRequest;
