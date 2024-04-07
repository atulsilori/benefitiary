import { Descriptions, Modal } from "antd";

type Iprops = {
  benefitiaryData: Record<any, any>;
  viewbenefitiaryId: string;
  isOpen: boolean;
  setIsopen: (param: boolean) => void;
};

/**
 * modal for viewing benefitiary
 * @param Iprops
 * @returns React.FC
 **/
const Viewbenefitiary: React.FC<Iprops> = ({
  benefitiaryData,
  viewbenefitiaryId,
  isOpen = false,
  setIsopen,
}) => {
  const benefitiaryDetail = benefitiaryData.find(
    (data: any) => data.id === viewbenefitiaryId
  );

  const keyLabelMapping: Record<string, string> = {
    name: "Name",
    account: "Account Number",
    bankname: "Bank Name",
    accounttype: "Account Type",
  };

  const items = Object.keys(benefitiaryDetail).reduce(
    (accumulator: any, currentValue) => {
      if (currentValue !== "id") {
        accumulator.push({
          key: String(accumulator.length + 1),
          label: keyLabelMapping[currentValue],
          children: benefitiaryDetail[currentValue],
        });
      }
      return accumulator;
    },
    []
  );

  return (
    <div>
      <Modal open={isOpen} onCancel={() => setIsopen(false)} footer={null}>
        <div>
          <Descriptions
            title="Benefitiary Info"
            items={items}
            column={1}
            bordered
          />
        </div>
      </Modal>
    </div>
  );
};

export default Viewbenefitiary;
