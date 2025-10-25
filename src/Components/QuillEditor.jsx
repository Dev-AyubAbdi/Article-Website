import React, { forwardRef, useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill-new";
import './quill.snow.css'

export const QuillEditor = forwardRef(
  ({ value, onChange, placeholder, classname, height = 400 }, ref) => {

    const quillRef = useRef()
    const [editorValue, setEditorValue] = useState(value || "")

    const handleChange = () => {

    }
       const modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image'],
            ['clean']
        ]
    };

     const formats = [
        'header', 'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'indent', 'link', 'image', 'code-block', 'script'
    ];

    useEffect(()=> {
            setEditorValue(value || "")
    },[value])
    return (
        <div className={classname || ""} style={{height: `${height}px`}}>
        
        <ReactQuill
        
        ref={quillRef}
        value={editorValue}
        onChange={handleChange}
        placeholder={placeholder || "write your content..."}
        theme="snow"
        style={{height: `${height - 42}px`}}
        modules={modules}
        formats={formats}
        
        />
                

        </div>
    )
  }
);
