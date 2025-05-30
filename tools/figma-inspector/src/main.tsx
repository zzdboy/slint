// Copyright © SixtyFPS GmbH <info@slint.dev>
// SPDX-License-Identifier: GPL-3.0-only OR LicenseRef-Slint-Royalty-free-2.0 OR LicenseRef-Slint-Software-3.0

import React, { useEffect, useState } from "react";
import { listenTS } from "./utils/bolt-utils";
import "./main.css";
import { copyToClipboard } from "./utils/utils.js";

export const App = () => {
    const [title, setTitle] = useState("");
    const [slintProperties, setSlintProperties] = useState("");

    listenTS(
        "updatePropertiesCallback",
        (res) => {
            setTitle(res.title);
            setSlintProperties(res.slintProperties);
        },
        true,
    );

    return (
        <div className="container">
            <div className="title">
                {title}
                {slintProperties !== "" && (
                    <span
                        id="copy-icon"
                        onClick={() => copyToClipboard(slintProperties)}
                        onKeyDown={() => copyToClipboard(slintProperties)}
                        className="copy-icon"
                    >
                        📋
                    </span>
                )}
            </div>
            <div className="content">{slintProperties}</div>
        </div>
    );
};
