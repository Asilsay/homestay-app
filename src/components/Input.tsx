import React, { FC } from 'react';

interface FormikProps {
  id: string;
  label?: string;
  name?: string;
  value?: string | number;
  error?: string | boolean | undefined;
  touch?: string | boolean | undefined;
  disabled?: boolean | undefined;
}

interface InputProps extends FormikProps {
  type?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

interface TextAreaProps extends FormikProps {
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
}

export const Input: FC<InputProps> = ({
  id,
  label,
  name,
  type,
  value,
  error,
  onChange,
  onBlur,
  touch,
  disabled,
}) => {
  return (
    <div className="h-16 w-full">
      <input
        className={`input w-full bg-base-200 ${
          error && touch ? 'input-error' : ''
        }`}
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={label}
        onBlur={onBlur}
        disabled={disabled}
      />

      {error && touch && (
        <span className="text-sm text-error label-text-alt">{error}</span>
      )}
    </div>
  );
};

export const InputFile: FC<InputProps> = ({
  id,
  label,
  name,

  value,
  error,
  onChange,
  onBlur,
  touch,
}) => {
  return (
    <div className="h-16 w-full">
      <input
        className={`file-input w-full bg-base-200 ${
          error && touch ? 'file-input-bordered file-input-error' : ''
        }`}
        id={id}
        type="file"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={label}
        onBlur={onBlur}
      />

      {error && touch && (
        <span className="text-sm text-error label-text-alt">{error}</span>
      )}
    </div>
  );
};

export const TextArea: FC<TextAreaProps> = ({
  id,
  label,
  name,
  value,
  error,
  onChange,
  onBlur,
  touch,
}) => {
  return (
    <div className="h-[90px] w-full">
      <textarea
        className={`textarea w-full bg-base-200  ${
          error && touch ? 'textarea-error' : ''
        }`}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={label}
        onBlur={onBlur}
      />
      <p>
        {error && touch && <span className="text-sm text-error">{error}</span>}
      </p>
    </div>
  );
};
