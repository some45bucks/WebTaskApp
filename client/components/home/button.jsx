export const Button = ({ children, ...props }) => {
  return (
    <button className="p-4 border-2 rounded" {...props}>
      {children}
    </button>
  );
};
