const defaultBenefitiaryValue = {
  name: "",
  account: "",
  bankname: "",
  accounttype: "",
};

const benefitiaryAccountTypeOptions = [
  { value: "savings", label: "Savings Account" },
  { value: "joint", label: "Joint Account" },
  { value: "current", label: "Current Account" },
];

const prepareBenfitiaryValue = (benefitiary: any, id: any) => {
  const benefitiaryData = benefitiary.find((item: any) => item.id === id);
  const { name, account, bankname, accounttype } = benefitiaryData;
  return { name, account, bankname, accounttype };
};

export {
  defaultBenefitiaryValue,
  benefitiaryAccountTypeOptions,
  prepareBenfitiaryValue,
};
