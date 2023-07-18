type Props = {
  id: string;
  options: { id: string; text: string }[];
  defaultValue: string;
  onChange: (id: string) => void;
};

const Select = ({ id, options, defaultValue, onChange }: Props) => {
  return (
    <select
      id={id}
      defaultValue={defaultValue}
      className="block w-full p-3 text-sm text-gray-600 bg-gray-100 border-0 rounded-md basis-full ring-1 ring-gray-600 hover:text-gray-900 focus:outline-none focus:ring-gray-900 focus:ring-offset-2 focus:ring-offset-gray-100"
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.text}
        </option>
      ))}
    </select>
  );
};

export default Select;
