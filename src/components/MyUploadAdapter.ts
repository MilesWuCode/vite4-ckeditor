// https://ckeditor.com/docs/ckeditor5/latest/framework/deep-dive/upload-adapter.html

import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";

class MyUploadAdapter {
  loader: any;

  constructor(loader: any) {
    // The file loader instance to use during the upload.
    this.loader = loader;
  }

  // Starts the upload process.
  upload() {
    // Update the loader's progress.
    // server.onUploadProgress((data) => {
    //   loader.uploadTotal = data.total;
    //   loader.uploaded = data.uploaded;
    // });

    // Return a promise that will be resolved when the file is uploaded.
    // return loader.file.then((file) => server.upload(file));

    // ...

    return this.loader.file.then(
      (file: File) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();

          reader.onloadend = () => {
            resolve({ default: reader.result });
          };

          reader.onerror = (err) => {
            reject(err);
          };

          reader.onabort = () => {
            reject();
          };

          reader.readAsDataURL(file);
        })
    );
  }

  abort() {
    // 實作刪除
    console.log("abort");
  }
}

export function MyAdapterPlugin(editor: ClassicEditor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader: any) =>
    new MyUploadAdapter(loader);
}
