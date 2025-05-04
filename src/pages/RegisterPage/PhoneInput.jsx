import React from "react";
import { IMaskInput } from "react-imask";

const PhoneInput = ({
  value,
  onChange,
  label,
  error,

  name,
  classInput,
}) => {
  return (
    <div className="PhoneInput-container">
      <div className="title">
        {label && <label className="label">{label}</label>}
      </div>
      <div className="PhoneInput-value">
        <IMaskInput
          mask="+7 (000) 000-00-00"
          definitions={{
            0: /[0-9]/,
          }}
          placeholder="+7 (___) ___-__-__"
          value={value}
          name={name}
          type="tel"
          className={classInput} // Убедись, что classInput передается сюда
          onAccept={(val) => onChange(val)}
        />
        {error && <label className="phoneError">{error}</label>}
      </div>
    </div>
  );
};

export default PhoneInput;
