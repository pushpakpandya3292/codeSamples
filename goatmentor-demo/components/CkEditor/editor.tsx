import React, { memo, useEffect, useRef } from "react";
import EditorJS, { EditorConfig, OutputData } from "@editorjs/editorjs";
import { getStorage, ref } from "firebase/storage";
import firebaseUpload from "@/utils/firebaseUpload";
import List from '@editorjs/list'
import ImageTool from '@editorjs/image'
import Header from '@editorjs/header'
import Paragraph from "@editorjs/paragraph";
import Embed from '@editorjs/embed'
import Code from '@editorjs/code'
import Quote from '@editorjs/quote'
import Marker from '@editorjs/marker'
import InlineCode from '@editorjs/inline-code'
import { useToast } from "@/utils/toast";
import { AlertColor } from "@mui/material";

interface CustomEditorProps {
    onChange: (data: OutputData) => void;
    editorblock: string;
    value: OutputData;
    editorClass?: string;
}

const handleUploadByFile = async (
    file: File,
    showToast: (severity: AlertColor, message: string) => void
) => {
    const storage = getStorage();
    const ext = file?.name.split(".").pop();
    const profileRef = ref(
        storage,
        `blogs/blogContent/${Date.now()}.${ext ?? "jpg"}`
    );

    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = function () {
            const minUploadPixle = 600
            const height = img.height
            const width = img.width;
            if (width < minUploadPixle || height < minUploadPixle) {
                showToast('error', 'Image dimensions too small');
                reject('Image dimensions too small');
            } else {
                firebaseUpload(profileRef, file)
                    .then((response) => response)
                    .then((responseData) => {
                        resolve({
                            success: 1,
                            file: {
                                url: responseData,
                            },
                            withBorder: false,
                            withBackground: false,
                            stretched: false
                        });
                    })
                    .catch((error) => {
                        reject(error);
                    });
            }
        }
        img.src = URL.createObjectURL(file);
    })
}

const CustomEditor: React.FC<CustomEditorProps> = ({ onChange, editorblock, value, editorClass }) => {
    const editiorRef = useRef<EditorJS | null>();
    const { showToast } = useToast();

    useEffect(() => {
        if (!editiorRef.current) {
            const editor = new EditorJS({
                holder: editorblock,
                minHeight: 150,
                data: { ...value },
                async onChange(api) {
                    const data = await api.saver.save();
                    onChange(data);
                },
                tools: {
                    paragraph: {
                        class: Paragraph,
                        inlineToolbar: true,
                        config: {
                            placeholder: 'Enter a content paragraph',
                            preserveBlank: true
                        }
                    },
                    image: {
                        class: ImageTool,
                        config: {
                            uploader: {
                                uploadByFile: (file: File) => handleUploadByFile(file, showToast)
                            }
                        },
                    },
                    embed: Embed,
                    marker: Marker,
                    code: Code,
                    quote: Quote,
                    inlineCode: InlineCode,
                    list: List,
                    header: {
                        class: Header,
                        config: {
                            placeholder: 'Enter a content header',
                            levels: [2, 3, 4, 5, 6],
                            defaultLevel: 2
                        }
                    },
                },
            });
            editiorRef.current = editor;
        }

        return () => {
            if (editiorRef.current && editiorRef.current.destroy) {
                editiorRef.current.destroy();
            }
        };
    }, []);

    return <div id={editorblock} className={editorClass} />;
};

export default memo(CustomEditor);
