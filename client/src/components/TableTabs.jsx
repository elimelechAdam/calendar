import { Tab, Tabs, TabsHeader } from "@material-tailwind/react";

const TABS = [
  {
    label: "הכל",
    value: "הכל",
  },
  {
    label: "בקשות שאושרו",
    value: "אושר",
  },
  {
    label: "בקשות ממתינות",
    value: "ממתין",
  },
  {
    label: "בקשות שלא אושרו",
    value: "לא אושר",
  },
];

const TableTabs = ({ activeTab, setActiveTab }) => {
  return (
    <Tabs
      value={activeTab}
      onChange={(e, newValue) => setActiveTab(newValue)}
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
