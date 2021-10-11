import { useState, useEffect } from "react";
import { Button, Card, Col, message, Row, Table, Tag } from "antd";
import Title from "antd/es/typography/Title";
import { BookOutlined, FireOutlined, ToolOutlined } from "@ant-design/icons";
import { getAllRequests, setRequestStatus } from "../utils";
import "./RequestAdmin.css";

const RequestAdmin = () => {
  const [allRequests, setAllRequests] = useState([]);

  const [fetchRequests, setFetchRequests] = useState(true);
  useEffect(() => {
    if (fetchRequests) {
      getAllRequests()
        .then((data) => {
          setAllRequests(data);
          setFetchRequests(false);
        })
        .catch((err) => {
          message.error(err.message);
          setFetchRequests(false);
        });
    }
  }, [fetchRequests]);

  const updateStatus = (requestId, newStatus) => {
    setRequestStatus({
      requestId: requestId,
      status: newStatus,
    })
      .then(() => {
        setFetchRequests(true);
        message.success("Successfully updated status.");
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
      width: "10%",
      render: (creationTime) => {
        return (
          <>
            <p>
              {new Date(creationTime).toLocaleDateString("en-US")}
              <span> </span>
              {new Date(creationTime).toLocaleTimeString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </>
        );
      },
    },
    {
      title: "REQUESTER",
      dataIndex: "emailId",
      width: "10%",
      sorter: (a, b) => a.emailId.localeCompare(b.emailId),
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
                case "BOOK_FACILITIES":
                  return (
                    <Tag color="grey" key={category}>
                      <BookOutlined /> Book Facilities
                    </Tag>
                  );
                case "LODGE_COMPLAINT":
                  return (
                    <Tag color="grey" key={category}>
                      <FireOutlined /> Lodge Complaint
                    </Tag>
                  );
                case "REQUEST_REPAIR":
                  return (
                    <Tag color="grey" key={category}>
                      <ToolOutlined /> Request Repair
                    </Tag>
                  );
                default:
                  return (
                    <Tag color="grey" key={category}>
                      <BookOutlined /> Others
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
      width: "45%",
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
      title: "STATUS",
      dataIndex: "status",
      width: "10%",
      sorter: (a, b) => a.status.localeCompare(b.status),
      render: (status) => {
        let color = "green";
        if (status === "Open") {
          color = "pink";
        } else if (status === "In progress") {
          color = "blue";
        }
        return (
          <Tag color={color} key={status}>
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "ACTION",
      width: "10%",
      dataIndex: "status",
      render: (status, record) => {
        switch (status.toLowerCase()) {
          case "open":
            return (
              <Button
                type="primary"
                onClick={() => updateStatus(record.requestId, "In progress")}
              >
                In progress
              </Button>
            );
          case "in progress":
            return (
              <Button
                type="primary"
                className="RequestAdmin-resolvedButton"
                onClick={() => updateStatus(record.requestId, "Resolved")}
              >
                Resolved
              </Button>
            );
          case "resolved":
          default:
            return "-";
        }
      },
    },
  ];

  return (
    <>
      <Card title="Request Management" className="RequestAdmin-card">
        <Table
          columns={columns}
          dataSource={allRequests}
          rowKey="requestId"
          pagination={{
            pageSize: 5,
          }}
        />
      </Card>
    </>
  );
};

export default RequestAdmin;
