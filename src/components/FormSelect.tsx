import { useState } from "react";
import { FieldProps } from "formik";

export interface SelectOption {
  name: string;
  id: string | number;
}

interface FormSelectValues extends FieldProps {
  options: SelectOption[];
  placeholder: string;
  label: string;
}

export const FormSelect = ({
  field,
  form,
  options,
  placeholder,
  label,
}: FormSelectValues) => {
  const [field, meta] = useField(name);
  const { setFieldValue, setFieldTouched } = useFormikContext();
  const [open, setOpen] = useState(false);

  const selectedOption = options.find((o) => o.id === field.value) || null;

  const handleOpenClick = () => {
    setOpen(!open);
  };

  const handleOptionClick = (option: SelectOption) => {
    form.setFieldValue(field.name, option.id);
    setOpen(false);
  };

  return (
    <div className="form-group">
      <label className="form-label" htmlFor="">
        {label}
      </label>
      <div className="form-select">
        <button
          type="button"
          onClick={handleOpenClick}
          className="form-select-trigger"
        >
          <span className="form-select-text">
            {selectedOption ? selectedOption.name : placeholder}
          </span>
        </button>
        <ul className={`form-select-options ${open ? "show" : ""}`}>
          {options.map((o) => (
            <li
              key={o.id}
              className="form-select-option"
              onClick={() => handleOptionClick(o)}
            >
              {o.name}
            </li>
          ))}
        </ul>
        <input type="hidden" {...field} value={field.value || ""} />
      </div>
    </div>
  );
};
