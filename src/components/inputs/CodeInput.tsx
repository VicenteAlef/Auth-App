import React, { useRef, useState, useEffect } from "react";

type OTPInputProps = {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  label?: string;
};

export function OTPInput({
  length = 6,
  value,
  onChange,
  label = "Verification Code",
}: OTPInputProps) {
  // Array to track each digit's input reference
  const inputRefs = useRef<HTMLInputElement[]>([]);

  // Convert the string value to an array for easier mapping
  const digits = value.split("");

  const handleChange = (index: number, newValue: string) => {
    // Only allow numbers
    const char = newValue.slice(-1);
    if (char && !/^\d+$/.test(char)) return;

    const newOtp = [...digits];
    newOtp[index] = char;
    const combinedValue = newOtp.join("");

    onChange(combinedValue);

    // Move to next input if value is entered
    if (char && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      // Move focus back on backspace if current field is empty
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const data = e.clipboardData.getData("text").slice(0, length);
    if (!/^\d+$/.test(data)) return;
    onChange(data);
    // Focus the last filled input or the last input
    inputRefs.current[Math.min(data.length, length - 1)]?.focus();
  };

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <div className="flex justify-between gap-2" onPaste={handlePaste}>
        {Array.from({ length }).map((_, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el!)}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={1}
            value={digits[index] || ""}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="w-12 h-14 text-center text-xl font-bold border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        ))}
      </div>
    </div>
  );
}
