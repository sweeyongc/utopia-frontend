import { useHistory } from "react-router-dom";
import { Layout, Button, Space } from "antd";
import { logout } from "../utils";
import "./MainLayout.css";

const { Header, Content, Footer } = Layout;

const showLogoText = (isAdmin) => {
  return isAdmin ? "UTOPIA|ADMIN" : "UTOPIA";
};

const MainLayout = ({ user, children }) => {
  const history = useHistory();
  const isAdmin = user.role === "admin";

  const onLogout = () => {
    logout();
  };

  return (
    <Layout className="MainLayout-layout">
      <Header className="MainLayout-header">
        <div className="MainLayout-headerDiv">
          {/*  eslint-disable-next-line */}
          <a
            onClick={() => history.push("/announcements")}
            className="MainLayout-logo"
          >
            {showLogoText(isAdmin)}
          </a>
          <div className="MainLayout-buttonDiv">
            <Space>
              <Button
                type="text"
                size="middle"
                onClick={() => {
                  history.push("/announcements");
                }}
              >
                Home
              </Button>

              {user.role === "admin" && (
                <Button
                  type="text"
                  size="middle"
                  onClick={() => {
                    history.push("/announcement-management");
                  }}
                >
                  Announcements
                </Button>
              )}

              {user.role === "admin" && (
                <Button
                  type="text"
                  size="middle"
                  onClick={() => {
                    history.push("/request-management");
                  }}
                >
                  Requests
                </Button>
              )}

              {user.role !== "admin" && (
                <Button
                  type="text"
                  size="middle"
                  onClick={() => {
                    history.push("/profile");
                  }}
                >
                  My Profile
                </Button>
              )}

              <Button
                type="text"
                size="middle"
                onClick={() => {
                  history.push("/login");
                  onLogout();
                }}
              >
                Logout
              </Button>
            </Space>
          </div>
        </div>
      </Header>

      <Content>{children}</Content>
      <Footer className="MainLayout-footer">
        <p>
          About us
          <br />
          Utopia community features townhouses with spacious interiors,
          light-filled rooms, modern finishes and the latest in smart home tech.
          <br />
          These are accompanied by a collection of outdoor spaces and
          hospitality-focused amenities.
        </p>
        <div className="MainLayout-footerSpacing">
          3645 Haven Avenue Menlo Park, CA 94025 | contactus@utopia.com |
          650-708-1111
        </div>
        <div>©2020 Utopia Management, LLC</div>
      </Footer>
    </Layout>
  );
};

export default MainLayout;
