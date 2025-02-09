'use client'; // Ensure this is treated as a client-side component (if using Next.js 13+ with the app directory)

const Button = ({ 
  type = "button", // Default button type
  onClick, // Function for the click event
  className, // Additional custom classes
  children, // Button text or any content you want to pass
  disabled = false, // If the button should be disabled
  variant = "primary", // Variant for different styles (e.g., primary, secondary)
  ...props 
}) => {
  const baseStyles = "px-4 py-2 rounded-md font-semibold focus:outline-none transition-all duration-300";
  const variantStyles = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-500 text-white hover:bg-gray-600",
    danger: "bg-red-500 text-white hover:bg-red-600",
    outline: "bg-transparent text-blue-500 border-2 border-blue-500 hover:bg-blue-500 hover:text-white",
  };

  // Combine base styles with variant styles and any custom class names passed in
  const buttonStyles = `${baseStyles} ${variantStyles[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`;

  return (
    <button
      type={type}
      onClick={onClick}
      className={buttonStyles}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
