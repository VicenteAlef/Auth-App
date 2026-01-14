import { useState } from "react";

import { Eye, EyeOff } from "lucide-react";

type InputPassProps = {
  value: string;

  onChange: (value: string) => void;

  mode?: "login" | "signup";

  label?: string;

  placeholder?: string;

  name?: string;

  required?: boolean;
};

export function InputPass({
  value,

  onChange,

  mode = "login",

  label = "Password",

  placeholder = "enter your password",

  name = "password",

  required = true,
}: InputPassProps) {
  const [showPassword, setShowPassword] = useState(false);

  const isSignup = mode === "signup";

  const passwordRules = {
    length: value.length >= 8,

    upper: /[A-Z]/.test(value),

    lower: /[a-z]/.test(value),

    number: /\d/.test(value),

    special: /[^A-Za-z0-9]/.test(value),
  };

  const isPasswordValid = Object.values(passwordRules).every(Boolean);

  return (
    <div className="w-full space-y-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          name={name}
          value={value}
          required={required}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full rounded-md border px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2

${
  isSignup && value.length > 0 && !isPasswordValid
    ? "border-red-500 focus:ring-red-500"
    : "border-gray-300 focus:ring-blue-500"
}`}
        />

        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {isSignup && value.length > 0 && (
        <ul className="text-xs space-y-0.5 flex flex-wrap gap-1 ">
          <li
            className={passwordRules.length ? "text-green-600" : "text-red-600"}
          >
            • At least 8 characters,
          </li>

          <li
            className={passwordRules.upper ? "text-green-600" : "text-red-600"}
          >
            one uppercase letter,
          </li>

          <li
            className={passwordRules.lower ? "text-green-600" : "text-red-600"}
          >
            one lowercase letter,
          </li>

          <li
            className={passwordRules.number ? "text-green-600" : "text-red-600"}
          >
            one number,
          </li>

          <li
            className={
              passwordRules.special ? "text-green-600" : "text-red-600"
            }
          >
            one special character.
          </li>
        </ul>
      )}
    </div>
  );
}
