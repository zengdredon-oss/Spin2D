import React from 'react';
import { FiCheck } from 'react-icons/fi';

interface CheckboxProps {
  checked: boolean | null;
  onChange: (checked: boolean | null) => void;
  label?: string;
  triState?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  label,
  triState = false,
}) => {
  const handleClick = () => {
    if (triState) {
      // Cycle through: null -> true -> false -> null
      if (checked === null) onChange(true);
      else if (checked === true) onChange(false);
      else onChange(null);
    } else {
      onChange(!checked);
    }
  };

  return (
    <label className="inline-flex items-center cursor-pointer group">
      <div
        onClick={handleClick}
        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
          checked === true
            ? 'bg-primary-500 border-primary-500'
            : checked === false
            ? 'bg-red-500 border-red-500'
            : 'bg-white border-gray-300 group-hover:border-primary-400'
        }`}
      >
        {checked === true && <FiCheck className="text-white text-sm" />}
        {checked === false && <span className="text-white text-xs font-bold">✕</span>}
      </div>
      {label && (
        <span className="ml-2 text-sm text-gray-700 group-hover:text-gray-900">{label}</span>
      )}
    </label>
  );
};

export default Checkbox;
