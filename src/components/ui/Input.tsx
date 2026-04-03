import React from 'react';

type InputBaseProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix'>;

interface InputProps extends InputBaseProps {
  label?: string;
  prefix?: React.ReactNode;
  error?: string;
  helperText?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  prefix,
  error,
  helperText,
  className = '',
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-gray-800 mb-2">{label}</label>
      )}
      <div
        className={`flex items-center border rounded-xl px-4 py-3 transition-all duration-200 ${
          error
            ? 'border-red-400 focus-within:ring-2 focus-within:ring-red-200'
            : 'border-gray-200 focus-within:border-[#6C3AED] focus-within:ring-2 focus-within:ring-[#6C3AED]/20'
        } bg-white ${className}`}
      >
        {prefix && <span className="flex items-center mr-3 text-gray-500 border-r border-gray-200 pr-3">{prefix}</span>}
        <input
          className="flex-1 outline-none bg-transparent text-gray-800 placeholder-gray-400 text-base"
          {...props}
        />
      </div>
      {error && <p className="mt-1.5 text-sm text-red-500">{error}</p>}
      {helperText && !error && <p className="mt-1.5 text-sm text-gray-500">{helperText}</p>}
    </div>
  );
};

export default Input;
