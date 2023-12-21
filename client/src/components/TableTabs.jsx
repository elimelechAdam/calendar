import { Tab, Tabs, TabsHeader } from "@material-tailwind/react";

const TABS = [
  {
    label: "הכל",
    value: "all",
  },
  {
    label: "בקשות שאושרו",
    value: "granted",
  },
  {
    label: "בקשות ממתינות",
    value: "awaiting",
  },
  {
    label: "בקשות שלא אושרו",
    value: "unGranted",
  },
];

const TableTabs = () => {
  return (
    <Tabs value="all" className="w-1/2">
      <TabsHeader>
        {TABS.map(({ label, value }) => (
          <Tab key={value} value={value} className="">
            &nbsp;&nbsp;{label}&nbsp;&nbsp;
          </Tab>
        ))}
      </TabsHeader>
    </Tabs>
  );
};

export default TableTabs;
