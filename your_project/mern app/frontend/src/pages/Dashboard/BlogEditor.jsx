import React, { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const BlogEditor = () => {
    const [formData, setFormData] = useState({ content: '' });
    const quillRef = useRef(null);

    const handleContentChange = (value) => {
        setFormData({ ...formData, content: value });
    };

    // const handleImageUpload = () => {
    //     const input = document.createElement('input');
    //     input.setAttribute('type', 'file');
    //     input.setAttribute('accept', 'image/*');
    //     input.click();

    //     // input.onchange = async () => {
    //     //     const file = input.files[0];
    //     //     const formData = new FormData();
    //     //     formData.append('image', file);

    //     //     // Upload image to your server
    //     //     const response = await axios.post('http://localhost:8080/upload', formData, {
    //     //         headers: {
    //     //             'Content-Type': 'multipart/form-data'
    //     //         }
    //     //     });

    //     //     const imageUrl = await response.text(); // Get image URL from server response

    //     //     const quill = quillRef.current.getEditor();
    //     //     const range = quill.getSelection();
    //     //     quill.insertEmbed(range.index, 'image', imageUrl);
    //     // };
    // };

    const modules = {
        toolbar: {
            container: [
                [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ 'script': 'sub'}, { 'script': 'super' }],
                [{ 'indent': '-1'}, { 'indent': '+1' }, { 'direction': 'rtl' }],
                [{ 'color': [] }, { 'background': [] }],
                [{ 'align': [] }],
                ['link', 'image', 'video'],
                ['clean']
            ],
            // handlers: {
            //     'image': handleImageUpload
            // }
        }
    };

    return (
        <div className="editor py-2 mb-4">
            <ReactQuill 
                ref={quillRef}
                onChange={handleContentChange}
                theme="snow"
                placeholder="Write your blog content here ...."
                className="h-60 mb-12"
                modules={modules}
            />
        </div>
    );
};

export default BlogEditor;