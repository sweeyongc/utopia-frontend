import React, { useState, useEffect } from "react";
import { Row, Col, Avatar, Descriptions, Divider, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { getAccountInfo } from "../utils";
import "./AccountInfo.css";

const AccountInfo = () => {
  const [accountInfo, setAccountInfo] = useState([]);

  useEffect(() => {
    getAccountInfo()
      .then((data) => {
        setAccountInfo(data);
      })
      .catch((err) => {
        message.error(err.message);
      });
  }, []);

  return (
    <Row>
      <Col flex={1}></Col>
      <Col flex={3}>
        <br />
        <Divider>
          <h1>ACCOUNT INFO</h1>
        </Divider>
        <div className="AccountInfo-div">
          <Avatar size={100} icon={<UserOutlined />} />
        </div>
        <br />
        <Descriptions
          title="Personal Information"
          bordered
          layout="vertical"
          size="small"
          column={{ xxl: 2, xl: 2, lg: 1, md: 1, sm: 1, xs: 1 }}
        >
          <Descriptions.Item label="First Name">
            {accountInfo.firstName}
          </Descriptions.Item>
          <Descriptions.Item label="Last Name">
            {accountInfo.lastName}
          </Descriptions.Item>
          <Descriptions.Item label="Email Address">
            {accountInfo.email}
          </Descriptions.Item>
        </Descriptions>

        <Divider />

        <Descriptions
          title="Address"
          bordered
          column={{ xxl: 3, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
        >
          <Descriptions.Item label="Address">
            {accountInfo.address}
          </Descriptions.Item>
        </Descriptions>
        <Divider />
      </Col>
      <Col flex={1}></Col>
    </Row>
  );
};

export default AccountInfo;
