import React, { useEffect, useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import SimpleUploadAdapter from "@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter";
import "@ckeditor/ckeditor5-build-classic/build/translations/zh.js";
import { MyAdapterPlugin } from "./MyUploadAdapter";
import {
  EditorConfig,
  PluginConstructor,
  Editor,
} from "@ckeditor/ckeditor5-core";

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
