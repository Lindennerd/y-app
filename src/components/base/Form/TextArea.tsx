export type TextAreaProps =
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label?: string;
    error?: string;
  };

export const TextArea = (props: TextAreaProps) => {
  return (
    <div className="flex flex-col">
      {props.label && <label>{props.label}</label>}
      <textarea
        className={`focus:ring-primary-200 rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 ${
          props.error ? "border-red-500" : ""
        }`}
        {...props}
      />
      {props.error && (
        <span className="text-sm text-red-500">{props.error}</span>
      )}
    </div>
  );
};
