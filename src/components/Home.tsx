import { Col, Row } from "antd";
import { Layout } from "antd";

const { Content } = Layout;

/**
 * home component
 * @returns React.FC
 * */
const Home: React.FC = () => {
  return (
    <Content style={{ padding: "0 48px" }}>
      <Row style={{ height: "100%" }}>
        <Col
          span={12}
          style={{
            marginTop: "1%",
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
          }}
          flex={1}
        >
          <span style={{ fontSize: "68px", color: "blue" }}>Hello User</span>
        </Col>
        <Col span={12} style={{ marginTop: "1%" }}>
          <img
            src={require("../bank.jpg")}
            alt="ads"
            style={{ height: "100%", width: "100%" }}
          />
        </Col>
      </Row>
    </Content>
  );
};

export default Home;
