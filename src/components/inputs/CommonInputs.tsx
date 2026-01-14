type InputTextProps = {
  value: string;

  type?: "text" | "email";

  onChange: (value: string) => void;

  label?: string;

  placeholder?: string;

  name?: string;

  required?: boolean;
};

export function InputText({
  value,

  type = "email",

  onChange,

  label = "Email",

  placeholder = "exemple@email.com",

  name = "password",

  required = true,
}: InputTextProps) {
  return (
    <div className="w-full space-y-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}

      <div className="relative">
        <input
          type={type}
          name={name}
          value={value}
          required={required}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full rounded-md border border-gray-300 px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
      </div>
    </div>
  );
}
