import React from "react";
import { Button } from "react-bootstrap";

export default function CommanButton({
    handleClick,
    name,
    type,
    btnText,
    classname,
}) {
    return (
        <>
            <Button
                onClick={() => handleClick(name)}
                type={type}
                name={name}
                className={classname}
            >
                {btnText}
            </Button>
        </>
    );
}
