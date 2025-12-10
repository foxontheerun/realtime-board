import React, { useEffect, useImperativeHandle, useRef } from "react";

export interface EditableTextProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  editable?: boolean;
}

export const EditableText = React.forwardRef<HTMLDivElement, EditableTextProps>(
  (
    {
      value,
      onChange,
      placeholder,
      className,
      autoFocus,
      editable = true,
      ...rest
    },
    forwardedRef
  ) => {
    const innerRef = useRef<HTMLDivElement | null>(null);

    useImperativeHandle(forwardedRef, () => innerRef.current as HTMLDivElement);

    useEffect(() => {
      if (!innerRef.current) return;
      if (innerRef.current.innerText !== value) {
        innerRef.current.innerText = value;
      }
    }, [value]);

    useEffect(() => {
      if (autoFocus && editable && innerRef.current) {
        innerRef.current.focus();
      }
    }, [autoFocus, editable]);

    useEffect(() => {
      if (!editable || !autoFocus) return;
      if (!innerRef.current) return;

      const el = innerRef.current;
      const selection = window.getSelection();
      if (!selection) return;

      const range = document.createRange();
      range.selectNodeContents(el);
      range.collapse(false);

      selection.removeAllRanges();
      selection.addRange(range);
    }, [editable, autoFocus]);

    return (
      <div
        ref={innerRef}
        contentEditable={editable}
        spellCheck={false}
        suppressContentEditableWarning
        className={className}
        data-placeholder={placeholder}
        onInput={
          editable ? (e) => onChange(e.currentTarget.innerText) : undefined
        }
        {...rest}
      />
    );
  }
);
