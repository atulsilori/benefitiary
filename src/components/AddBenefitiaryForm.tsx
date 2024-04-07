import { Layout, theme, Select, Input, Modal, App } from "antd";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";

import {
  defaultBenefitiaryValue,
  benefitiaryAccountTypeOptions,
  prepareBenfitiaryValue,
} from "../utils/benefitiaryUtils";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { add, edit } from "../redux/slice/benefitiary";
import React from "react";

const { Content } = Layout;
const { confirm } = Modal;

type Inputs = {
  name: string;
  account: string;
  bankname: string;
  accounttype: { label: string; value: string };
};

/**
 * Add and edit form component
 * @returns React.FC
 * */
const AddBenefitiaryForm: React.FC = () => {
  const { id: routeParamId } = useParams(); // getting path params
  const navigate = useNavigate(); // for navigating to a path

  const { message } = App.useApp();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const benefitiary = useAppSelector((state) => state.benefitiary.value);
  const benefitiaryDispatch = useAppDispatch();

  // if there is some param in path then prepare default value
  const defaultValue =
    routeParamId && benefitiary.length
      ? prepareBenfitiaryValue(benefitiary, routeParamId)
      : defaultBenefitiaryValue;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: defaultValue,
  });

  // submit handler
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (routeParamId) {
      const updatedBenefitiaryData = { id: routeParamId, ...data };

      confirm({
        title: "Do you want to update this benefitiary?",
        icon: <ExclamationCircleFilled />,
        onOk() {
          benefitiaryDispatch(edit(updatedBenefitiaryData));
          message.open({
            type: "success",
            content: "Benefitiary has been updated successfully.",
          });
          navigate("/benefitiary");
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    } else {
      const id = String(Date.now());
      const benefitiaryData = { id, ...data };

      confirm({
        title: "Do you want to Add this benefitiary?",
        icon: <ExclamationCircleFilled />,
        onOk() {
          benefitiaryDispatch(add(benefitiaryData));
          message.open({
            type: "success",
            content: "Benefitiary has been added successfully.",
          });
          navigate("/benefitiary");
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    }
  };

  // disable flag when there is an error
  const disabled =
    !!errors.name ||
    !!errors.account ||
    !!errors.bankname ||
    !!errors.accounttype;

  return (
    <Content style={{ padding: "0 48px" }} className="form-content">
      <div
        className="form-container"
        style={{
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="formfield">
            <label>Benefitiary Name:</label>
            <Controller
              name="name"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input {...field} placeholder="Enter name" />
              )}
            />
            {errors.name && (
              <span className="form-error">This field is required</span>
            )}
          </div>

          <div className="formfield">
            <label>Account number:</label>
            <Controller
              name="account"
              control={control}
              rules={{ required: true, pattern: /^\d{9,18}$/ }}
              render={({ field }) => (
                <Input {...field} placeholder="Enter Account number" />
              )}
            />
            {errors.account && errors.account.type === "required" && (
              <span className="form-error">This field is required</span>
            )}
            {errors.account && errors.account.type === "pattern" && (
              <span className="form-error">Enter valid account number</span>
            )}
          </div>

          <div className="formfield">
            <label>Bank Name:</label>
            <Controller
              name="bankname"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input {...field} placeholder="Enter Bank Name" />
              )}
            />
            {errors.bankname && (
              <span className="form-error">This field is required</span>
            )}
          </div>

          <div className="formfield">
            <label>Account Type:</label>
            <Controller
              name="accounttype"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <div className="selectfield">
                  <Select
                    {...field}
                    style={{ width: "100%" }}
                    placeholder="Please select an Account Type"
                    options={benefitiaryAccountTypeOptions}
                  />
                </div>
              )}
            />
            {errors.accounttype && (
              <span className="form-error">This field is required</span>
            )}
          </div>
          <div className="submitfield">
            <input
              type="submit"
              className={`submit-button ${disabled ? "submit-disabled" : ""}`}
              value={`${routeParamId ? "update" : "submit"}`}
            />
          </div>
        </form>
      </div>
    </Content>
  );
};

export default AddBenefitiaryForm;
