import React, { useEffect, useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "@ckeditor/ckeditor5-build-classic/build/translations/zh.js";
import { MyAdapterPlugin } from "./MyUploadAdapter";
import {
  Editor,
  EditorConfig,
  PluginConstructor,
} from "@ckeditor/ckeditor5-core";
import "./custom.css";

type Props = {
  defaultValue?: string;
  onChange?: (value: string) => void;
};

function Ckeditor5(props: Props) {
  const { defaultValue, onChange } = props;

  const editorConfig: EditorConfig = {
    language: "zh",
    placeholder: "input text...",
    extraPlugins: [MyAdapterPlugin as PluginConstructor<Editor>],
    toolbar: {
      items: [
        "heading",
        "|",
        "undo",
        "redo",
        "|",
        "bold",
        "italic",
        // "underline",
        // "strikethrough",
        // "subscript"
        // "superscript"
        // "code"
        // "removeFormat",
        "link",
        "|",
        // "fontFamily",
        // "fontSize",
        // "fontColor",
        // "fontBackgroundColor",
        "|",
        // "alignment",
        "bulletedList",
        "numberedList",
        "outdent",
        "indent",
        "|",
        "uploadImage",
        // "imageInsert",
        "mediaEmbed",
        "blockQuote",
        "insertTable",
        "|",
        // "sourceEditing",
        // "codeBlock",
      ],
    },
    mediaEmbed: {
      previewsInData: true,
    },
    link: {
      decorators: {
        openInNewTab: {
          mode: "manual",
          label: "Open in a new tab",
          attributes: {
            target: "_blank",
            rel: "noopener noreferrer",
          },
        },
      },
    },
    image: {
      resizeOptions: [
        {
          name: "imageResize:original",
          label: "Original",
          value: null,
        },
        {
          name: "imageResize:25",
          label: "25%",
          value: "25",
        },
        {
          name: "imageResize:50",
          label: "50%",
          value: "50",
        },
        {
          name: "imageResize:75",
          label: "75%",
          value: "75",
        },
      ],
      toolbar: [
        "imageStyle:full",
        "imageStyle:side",
        "imageStyle:alignLeft",
        "imageStyle:alignCenter",
        "imageStyle:alignRight",
        "|",
        "imageResize",
        "|",
        "imageTextAlternative",
      ],
      // styles: ["full", "side", "alignLeft", "alignCenter", "alignRight"],
    },
    // table: {
    //   contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
    // },
  };

  return (
    <CKEditor
      editor={ClassicEditor}
      data={defaultValue}
      config={editorConfig}
      onChange={(event, editor) => {
        const data = editor.getData();

        onChange && onChange(data);

        console.log({ event, editor, data });
      }}
    />
  );
}

export default Ckeditor5;
