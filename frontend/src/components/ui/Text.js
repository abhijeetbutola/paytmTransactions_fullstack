import clsx from "clsx";

function Text({ 
    children,
    as: Tag = "p",
    className = "",
    color,
 }) {

    const colorClasses = {
        primary: "text-blue-600",
        secondary: "text-gray-500",
        error: "text-red-600",
        warning: "text-yellow-600",
        success: "text-green-600",
      };

    return (
        <Tag className={clsx("text-base", color ? colorClasses[color] : "", className)}>
            {children}
        </Tag>
    )
}

export default Text