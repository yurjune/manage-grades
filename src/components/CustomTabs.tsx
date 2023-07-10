import { Tab, Tabs, TabsHeader } from '@material-tailwind/react';

interface CustomTabsProps {
  fields: { label: string; value: string }[];
  value?: string;
  onChange?: (v: string) => void;
}

export const CustomTabs = ({ fields, value, onChange }: CustomTabsProps) => {
  return (
    <Tabs value={value}>
      <TabsHeader className='bg-transparent'>
        {fields.map(({ label, value }) => (
          <Tab key={value} value={value} onClick={() => onChange?.(value)}>
            {label}
          </Tab>
        ))}
      </TabsHeader>
    </Tabs>
  );
};
