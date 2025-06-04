"use client"

import React, { useState, useRef } from "react"
import { AlertWarning } from "../alert"

type Props = {
    disabled?: boolean,
    acceptTypes: string[],
    onChange: (file: File | null) => void,
    className?: string,
    required: boolean,
    id?: string,
    label?: string,
    maxSize?: number
}

const FileInput = (props: Props) => {
    const [message, setMessage] = useState("")
    const [fileName, setFileName] = useState("No file chosen")
    const inputRef = useRef<HTMLInputElement>(null)
    const limitSize = props.maxSize
    const acceptTypes = props.acceptTypes.join()

    const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>, callback: (data: File | null) => void) : void => {
        const target = event.target;
        
        if (!target.files || target.files.length === 0) {
            setMessage("No file selected");
            setFileName("No file chosen");
            callback(null);
            return;
        }
    
        let currentFile: File = target.files[0];
        setMessage("");
        setFileName(currentFile.name);
    
        if (!props.acceptTypes.includes(currentFile.type)) {   
            target.value = "";
            setMessage(`'${currentFile.type}' is invalid file type. The allowed file types are ${acceptTypes}`);
            setFileName("No file chosen");
            callback(null);
            return;
        }
    
        if (limitSize && currentFile.size > limitSize) {
            target.value = "";
            setMessage(`Your file is oversize`);
            setFileName("No file chosen");
            callback(null);
            return;
        }
    
        callback(currentFile);
    };

    const handleButtonClick = () => {
        if (inputRef.current && !props.disabled) {
            inputRef.current.click();
        }
    }

    return (
        <div className="w-full flex flex-col gap-1 my-2">
            {props.label && <strong className="text-xs font-bold text-slate-500">{props.label}</strong>}
            
            {/* Hidden native file input */}
            <input 
                type="file" 
                className="hidden" 
                disabled={props.disabled} 
                accept={acceptTypes} 
                id={props.id} 
                ref={inputRef}
                onChange={e => handleFileInput(e, props.onChange)}
            />

            {/* Custom styled button */}
            <button 
                type="button" 
                onClick={handleButtonClick} 
                disabled={props.disabled}
                className={`px-4 py-2 bg-cyan-500 text-white rounded-md hover:cursor-pointer ${props.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                Choose File
            </button>

            {/* Show selected file name */}
            <span className="mt-1 text-sm text-gray-700">{fileName}</span>

            {message && (
                <AlertWarning title="Peringatan">
                    {message}
                </AlertWarning>
            )}
        </div>
    )
}

export default FileInput
