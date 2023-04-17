import { useCallback, useRef, useState } from "react";
import Ckeditor from "./components/Ckeditor";

function App() {
  const [value, setValue] = useState("");

  const debounceRef = useRef(0);

  const handleChange = useCallback((newValue: string) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      console.log(newValue);
      setValue(newValue);
    }, 400);
  }, []);

  function createMarkup() {
    return { __html: value };
  }

  return (
    <div className="App">
      <Ckeditor defaultValue={value} onChange={handleChange} />
      <hr />
      <div
        className="ck-content"
        dangerouslySetInnerHTML={createMarkup()}
      ></div>
      <hr />
      <div>{value}</div>
    </div>
  );
}

export default App;
