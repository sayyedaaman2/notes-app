export default function Button({ children, className = "",type="button", ...props }) {
    return (
        <button
        type={type}
            className={`px-4 py-2 rounded-md font-medium  transition duration-200 ease-in-out ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
