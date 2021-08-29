import React, { useState } from 'react';
import { Editor } from 'primereact/editor';
import { Controller } from "react-hook-form";

export function DescriptionEditor(props) {
    const maxDescriptionLength = 10000;
    const [quill, setQuill] = useState(null);

    const renderHeader = () => {
        return (
            <div className="toolbar">
                <span className="ql-formats">
                    <select className="ql-header" defaultValue={"3"}>
                        <option value="1">Heading</option>
                        <option value="2">Subheading</option>
                        <option value="3">Normal</option>
                        <option value="4">Small</option>
                        <option value="5">Tiny</option>
                    </select>
                    <select className="ql-font">
                        <option defaultValue value="sans-serif">Sans Serif</option>
                        <option value="serif">Serif</option>
                        <option value="monospace">Monospace</option>
                    </select>
                </span>
                <span className="ql-formats">
                    <button className="ql-bold"></button>
                    <button className="ql-italic"></button>
                    <button className="ql-underline"></button>
                </span>
                <span className="ql-formats">
                    <button className="ql-list" value="ordered"></button>
                    <button className="ql-list" value="bullet"></button>
                    <select className="ql-align">
                        <option defaultValue label="left"></option>
                        <option label="center" value="center"></option>
                        <option label="right" value="right"></option>
                        <option label="justify" value="justify"></option>
                    </select>
                </span>
                <span className="ql-formats">
                    <button className="ql-link"></button>
                    <button className="ql-image"></button>
                    <button className="ql-video"></button>
                </span>
                <span className="ql-formats">
                    <button className="ql-clean"></button>
                </span>
            </div>
        );
    }

    const header = renderHeader();

    return (<div className="p-inputgroup input-wrapper ">
        <Controller
            name="description"
            control={props.control}
            render={({ field }) =>
                <Editor
                    headerTemplate={header}
                    style={{ height: '320px' }}
                    onTextChange={e => {
                        if (quill.getLength() < maxDescriptionLength) {
                            field.onChange(e);
                        } else {
                            quill.deleteText(maxDescriptionLength, quill.getLength());
                        }
                    }}
                    onLoad={quill => setQuill(quill)}
                    placeholder="Type your description here."
                />}
        />
    </div>);
}
