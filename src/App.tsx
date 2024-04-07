import { Layout, Menu } from "antd";
import { useRoutes } from "react-router-dom";
import { Link } from "react-router-dom";

import Home from "./components/Home";
import Benefitiary from "./components/Benefitiary";
import AddBenefitiaryForm from "./components/AddBenefitiaryForm";

import "./App.css";

const { Header, Footer } = Layout;

// links
const links = [
  { link: "Home", to: "/" },
  { link: "ManageBenefitiary", to: "/benefitiary" },
];

// preparing links
const items = links.map((linkItem, index) => ({
  key: String(index + 1),
  label: <Link to={linkItem.to}>{linkItem.link}</Link>,
}));

/***
 * main app component
 *
 * */
function App() {
  // setting max height
  const height = window.innerHeight;

  // creating routes
  let element = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    { path: "benefitiary", element: <Benefitiary /> },
    { path: "addbenefitiary", element: <AddBenefitiaryForm /> },
    { path: "editbenefitiary/:id", element: <AddBenefitiaryForm /> },
  ]);

  return (
    <Layout style={{ minHeight: height }}>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          items={items}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      {element}
      <Footer style={{ textAlign: "center" }}>
        React Bank ©{new Date().getFullYear()} Created by Atul
      </Footer>
    </Layout>
  );
}

export default App;
