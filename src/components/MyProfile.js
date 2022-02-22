import React from "react";
import AccountInfo from "./AccountInfo";
import Payment from "./Payment";
import Request from "./Request";
import { Layout } from "antd";
import "./MyProfile.css";

const { Content, Sider } = Layout;

// Contains user profile layout arrangement 
const MyProfile = () => {
  return (
    <>
      <Layout>
        <Sider theme="light" width={400} className="site-layout-background">
          <AccountInfo />
        </Sider>

        <Layout className="MyProfile-layout">
          <Content className="MyProfile-content">
            <Request />
            <br />
            <Payment />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default MyProfile;
