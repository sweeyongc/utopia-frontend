import { useState, useEffect } from "react";
import { Button, Card, Col, message, Row, Space, Table, Tag } from "antd";
import Title from "antd/es/typography/Title";
import {
  HomeOutlined,
  TeamOutlined,
  ToolOutlined,
  ReadOutlined,
} from "@ant-design/icons";

import NewAnnouncement from "./NewAnnouncement";
import AnnouncementUpdate from "./AnnouncementUpdate";
import { getAllAnnouncements, deleteAnnouncement } from "../utils";
import "./AnnouncementAdmin.css";

// All announcement visible by Admin
const AnnouncementAdmin = () => {
  const [allAnnouncements, setAllAnnouncements] = useState([]);
  const [curAnnouncement, setCurAnnouncement] = useState(null);

  const [newAnnouncementVisible, setNewAnnouncementVisible] = useState(false);
  const closeNewAnnouncementModal = () => {
    setNewAnnouncementVisible(false);
    setFetchAnnouncements(true);
  };

  const [announcementUpdateVisible, setAnnouncementUpdateVisible] =
    useState(false);
  const closeAnnouncementUpdateModal = () => {
    setAnnouncementUpdateVisible(false);
    setFetchAnnouncements(true);
  };

  const [fetchAnnouncements, setFetchAnnouncements] = useState(true);
  useEffect(() => {
    if (fetchAnnouncements) {
      getAllAnnouncements()
        .then((data) => {
          setAllAnnouncements(data);
          setFetchAnnouncements(false);
        })
        .catch((err) => {
          message.error(err.message);
          setFetchAnnouncements(false);
        });
    }
  }, [fetchAnnouncements]);

  const getAnnouncementUpdate = (record) => {
    setAnnouncementUpdateVisible(true);
    setCurAnnouncement(record);
  };

  const getDeleteAnnouncement = (announcementId) => {
    deleteAnnouncement({ announcementId: announcementId })
      .then(() => {
        setFetchAnnouncements(true);
        message.success("Successfully deleted announcement");
      })
      .catch((err) => {
        message.error(err.message);
      });
  };

  const columns = [
    {
      title: "CREATION DATE",
      dataIndex: "creationTime",
      sorter: (a, b) => new Date(a.creationTime) - new Date(b.creationTime),
      defaultSortOrder: "descend",
      width: "15%",
      render: (creationTime) => {
        return (
          <>
            <p>{creationTime}</p>
          </>
        );
      },
    },
    {
      title: "CATEGORY",
      dataIndex: "category",
      width: "15%",
      sorter: (a, b) => a.category.localeCompare(b.category),
      render: (category) => {
        return (
          <>
            {(() => {
              switch (category) {
                case "GENERAL_ANNOUNCEMENT":
                  return (
                    <Tag color="grey" key={category}>
                      <HomeOutlined /> General Announcement
                    </Tag>
                  );
                case "COMMITTEE_MEETING":
                  return (
                    <Tag color="grey" key={category}>
                      <TeamOutlined /> Committee Meeting
                    </Tag>
                  );
                case "MAINTENANCE_UPDATE":
                  return (
                    <Tag color="grey" key={category}>
                      <ToolOutlined /> Maintenance Update
                    </Tag>
                  );
                default:
                  return (
                    <Tag color="grey" key={category}>
                      <ReadOutlined /> Others
                    </Tag>
                  );
              }
            })()}
          </>
        );
      },
    },
    {
      title: "DESCRIPTION",
      dataIndex: "content",
      width: "55%",
      render: (text, record) => {
        return (
          <Row gutter={{ xs: 4, sm: 8, md: 12, lg: 24 }}>
            <Col span={20}>
              <Title level={5}>{record.title}</Title>
              {record.content}
            </Col>
            <Col span={4}>
              {record.upload_pic === undefined ? (
                <></>
              ) : (
                <img src={record.upload_pic} width={100} alt="Upload" />
              )}
            </Col>
          </Row>
        );
      },
    },
    {
      title: "ACTION",
      width: "15%",
      dataIndex: "status",
      render: (status, record) => {
        return (
          <>
            <Space>
              <Button
                type="primary"
                onClick={() => getAnnouncementUpdate(record)}
              >
                Edit
              </Button>
              <Button
                type="default"
                onClick={() => getDeleteAnnouncement(record.announcementId)}
              >
                Delete
              </Button>
            </Space>
          </>
        );
      },
    },
  ];

  return (
    <>
      {newAnnouncementVisible && (
        <NewAnnouncement
          displayModal={newAnnouncementVisible}
          onSuccess={closeNewAnnouncementModal}
          onCancel={closeNewAnnouncementModal}
        />
      )}
      {announcementUpdateVisible && (
        <AnnouncementUpdate
          displayModal={announcementUpdateVisible}
          onSuccess={closeAnnouncementUpdateModal}
          onCancel={closeAnnouncementUpdateModal}
          curAnnouncement={curAnnouncement}
        />
      )}
      <Card
        title="Announcement Management"
        extra={
          <Button
            type="round"
            onClick={() => {
              setNewAnnouncementVisible(true);
            }}
          >
            New Announcement
          </Button>
        }
        className="AnnouncementAdmin-card"
      >
        <Table
          columns={columns}
          dataSource={allAnnouncements}
          rowKey="announcementId"
          pagination={{
            pageSize: 5,
          }}
        />
      </Card>
    </>
  );
};

export default AnnouncementAdmin;
