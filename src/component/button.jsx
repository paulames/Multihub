import e from "cors";
import React from "react";
import { useState } from "react";


function Button({className, children, onClick}) {
    return (
        <button id="button" type="button" className={className} onClick={onClick} >{children}</button>
    );
}

export default Button;