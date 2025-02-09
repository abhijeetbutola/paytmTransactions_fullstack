'use client'; // Ensure this is treated as a client-side component (if using Next.js 13+ with the app directory)

const Input = ({
  id,
  label,
  type = "text",
  placeholder = "",
  value,
  onChange,
  className,
  ...props
}) => {
  return (
    <div className="mb-4 w-full">
      {/* If a label is provided, render it */}
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        {...props}
      />
    </div>
  );
};

export default Input;
