import { Radio } from 'antd';
import React from 'react';

// Define the type for active options
type ActiveOptionType = {
  label: string;
  value: number;
};

interface SelectActiveRadioProps {
  defaultValue?: Boolean,
  onSave: (value: boolean) => void;
}

const SelectActiveRadio: React.FC<SelectActiveRadioProps> = ({ defaultValue, onSave }) => {
  const activeOptions: ActiveOptionType[] = [
    {
      value: 1,
      label: 'Active',
    },
    {
      value: 0,
      label: 'Not Active',
    },
  ];

  return (
    <div className="mt-4">
      <p className='mb-2 text-zinc-400 font-normal'>
        Is Domain Active?
      </p>
      <Radio.Group
        options={activeOptions}
        onChange={(e) => onSave(e.target.value === 1)}
        defaultValue={defaultValue ? 1 : 0}
      />
    </div>
  );
};

export default SelectActiveRadio;