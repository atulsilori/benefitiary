import { useState } from "react";
import { Layout, theme, Button, Card, Avatar, App, Modal } from "antd";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

import Viewbenefitiary from "./Viewbenefitiary";

import { useAppSelector } from "../redux/hooks";
import { useAppDispatch } from "../redux/hooks";
import { remove } from "../redux/slice/benefitiary";

const { Content } = Layout;
const { confirm } = Modal;

/**
 * Benefitiary list component
 * @returns React.FC
 **/
const Benefitiary: React.FC = () => {
  const [openModal, setIsOpenModal] = useState(false); // state to control modal visibility
  const [viewbenefitiaryId, setViewBenefitiaryId] = useState(""); // state storing id of benefitiary which is currently being viewed

  const benefitiary = useAppSelector((state) => state.benefitiary.value); // getting benefitiary data from benefitiary redux store slice
  const benefitiaryDispatch = useAppDispatch(); // getting dispatch function for benefitiary slice reducer

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { message } = App.useApp(); // for showing message

  // delete benefitiary
  const handleDeleteBenefitiary = (item: Record<any, any>) => {
    confirm({
      title: "Are you sure you want to delete this benefitiary?",
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        benefitiaryDispatch(remove(item));
        message.open({
          type: "success",
          content: "Benefitiary has been deleted successfully.",
        });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  // when there are no benefitiary
  if (benefitiary.length < 1) {
    return (
      <div className="empty-benefitiary">
        <p className="empty-benefitiary-label">
          Click on <em>Add New Benefitiary</em> to add new benefitiary
        </p>
        <Button type="primary" className="add-benefitiary-btn">
          <Link to="/addbenefitiary">Add New Benefitiary</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <Content style={{ padding: "0 48px" }}>
        <div className="benefitiary-list">
          {benefitiary.map((item) => {
            return (
              <Card
                className="benefitiary-list-item"
                key={item.id}
                style={{ width: 300, marginTop: 16 }}
                actions={[
                  <EyeOutlined
                    onClick={() => {
                      setIsOpenModal(true);
                      setViewBenefitiaryId(item.id);
                    }}
                  />,
                  <Link to={`/editbenefitiary/${item.id}`}>
                    <EditOutlined key="edit" />
                  </Link>,
                  <DeleteOutlined
                    onClick={() => handleDeleteBenefitiary(item)}
                  />,
                ]}
              >
                <Card.Meta
                  avatar={
                    <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=2" />
                  }
                  title={item.name}
                  description={item.accounttype}
                />
              </Card>
            );
          })}
        </div>
      </Content>
      <div
        className="add-benefitiary"
        style={{
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        <Button type="primary" className="add-benefitiary-btn">
          <Link to="/addbenefitiary">Add New Benefitiary</Link>
        </Button>
      </div>
      {/* mount modal when benefitiary is not empty and a benefitiary is currently being viewed */}
      {benefitiary.length > 0 && viewbenefitiaryId && (
        <Viewbenefitiary
          benefitiaryData={benefitiary}
          viewbenefitiaryId={viewbenefitiaryId}
          isOpen={openModal}
          setIsopen={setIsOpenModal}
        />
      )}
    </>
  );
};

export default Benefitiary;
