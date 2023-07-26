type Props<T> = {
  id: string;
  options: { id: T; text: string }[];
  defaultValue: T;
  value?: T;
  onChange: (id: T) => void;
};

function Select<T>({ id, options, defaultValue, value, onChange }: Props<T>) {
  return (
    <select
      id={id}
      defaultValue={defaultValue as string}
      className="block w-full p-3 text-sm text-gray-600 bg-gray-100 border-0 rounded-md basis-full ring-1 ring-gray-600 hover:text-gray-900 focus:outline-none focus:ring-gray-900 focus:ring-offset-2 focus:ring-offset-gray-100"
      onChange={(e) => onChange(e.target.value as T)}
      value={value ? (value as string) : undefined}
    >
      {options.map((option) => (
        <option key={option.id as string} value={option.id as string}>
          {option.text}
        </option>
      ))}
    </select>
  );
}

export default Select;
