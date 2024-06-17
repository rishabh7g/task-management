interface InputProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  name: string;
}

const Input = ({
  label,
  type,
  value,
  onChange,
  className,
  name,
}: InputProps) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        name={name}
        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
      />
    </div>
  );
};

export default Input;
