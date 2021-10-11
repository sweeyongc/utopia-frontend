import { Card, Col, Layout, message, Row, Space, Typography } from "antd";
import {
  ReadOutlined,
  TeamOutlined,
  ToolOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getAllAnnouncements } from "../utils";
import "./Announcements.css";

const { Text } = Typography;

const AnnouncementContent = (props) => {
  return (
    <Space direction="vertical">
      <h5>
        <Text type="secondary"> {props.date}</Text>
      </h5>
      <Text>{props.content}</Text>
    </Space>
  );
};

const getCategoryIcon = (category) => {
  const categoryToIcon = {
    GENERAL_ANNOUNCEMENT: <HomeOutlined />,
    COMMITTEE_MEETING: <TeamOutlined />,
    MAINTENANCE_UPDATE: <ToolOutlined />,
    OTHERS: <ReadOutlined />,
  };
  return categoryToIcon[category] || <ReadOutlined />;
};

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  useEffect(() => {
    getAllAnnouncements()
      .then((data) => {
        setAnnouncements(data);
      })
      .catch((err) => {
        message.error(err.message);
      });
  }, []);

  return (
    <Layout>
      <div className="Announcement-background">Announcements</div>

      <Row gutter={[16, 16]} className="Announcement-cardSection">
        {announcements.map(
          ({ announcementId, title, category, content, creationTime }) => (
            <Col key={announcementId} span={8}>
              <Card className="Announcement-card" bordered={false}>
                {getCategoryIcon(category)}
                <br />
                <h1 className="Announcement-title"> {title}</h1>
                <AnnouncementContent content={content} date={creationTime} />
              </Card>
            </Col>
          )
        )}
      </Row>
    </Layout>
  );
};

export default Announcements;
