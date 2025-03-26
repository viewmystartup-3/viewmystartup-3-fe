import React, { useState } from "react";
import "./SelectBox.css";
import toggle from "../../assets/ic_toggle.png";

/**
 * <SelectBox />
 *
 * Props:
 * - options: [{ label: string, value: string }]
 * - defaultValue: string
 * - onChange: (selectedValue: string) => void
 */

export default function SelectBox({
  options = [],
  onChange,
  defaultValue = options[0]?.value || "",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(
    options.find((opt) => opt.value === defaultValue || options[0])
  );

  const handleSelect = (option) => {
    setSelected(option);
    onChange?.(option.value);
    setIsOpen(false);
  };

  return (
    <div className="selectbox">
      <button className="selectbox-button" onClick={() => setIsOpen(!isOpen)}>
        {selected.label}
        <img src={toggle} alt="화살표" />
      </button>
      {isOpen && (
        <ul className="selectbox-options">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleSelect(option)}
              className="selectbox-option"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
