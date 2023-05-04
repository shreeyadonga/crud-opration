import React from "react";
import { Form } from "react-bootstrap";

export default function Input({
    type,
    name,
    placeholder,
    value,
    handleChange,
    label,
    autocomplete,
    className,
    id,
    max,
    userRef,
}) {
    return (
        <>
            <Form>
                <Form.Group>
                    <Form.Label htmlFor={label}>{label}</Form.Label>
                    <Form.Control
                        type={type}
                        name={name}
                        onChange={handleChange}
                        placeholder={placeholder}
                        value={value}
                        autoComplete={autocomplete}
                        className={className}
                        id={id}
                        maxLength={max}
                        ref={userRef}
                    />
                </Form.Group>
            </Form>
        </>
    );
}
