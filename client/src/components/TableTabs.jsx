import { Tab, Tabs, TabsHeader } from "@material-tailwind/react";

const TABS = [
  {
    label: "הכל",
    value: "all",
  },
  {
    label: "בקשות שאושרו",
    value: "approved",
  },
  {
    label: "בקשות ממתינות",
    value: "pending",
  },
  {
    label: "בקשות שלא אושרו",
    value: "denied",
  },
];

const TableTabs = ({ activeTab, setActiveTab }) => {
  return (
    <Tabs
      value={activeTab}
      onChange={(newValue) => setActiveTab(newValue)}
      className="w-3/5"
    >
      <TabsHeader className="">
        {TABS.map(({ label, value }) => (
          <Tab
            key={value}
            value={value}
            onClick={() => {
              setActiveTab(value);
            }}
          >
            &nbsp;&nbsp;{label}&nbsp;&nbsp;
          </Tab>
        ))}
      </TabsHeader>
    </Tabs>
  );
};

export default TableTabs;
