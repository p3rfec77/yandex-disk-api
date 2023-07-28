import { useContext, useState } from "react";
import { UploadContext } from "../../context/UploadContext";
import { CounterContext } from "../../context/CounterContext";

const Counter = () => {
  const { files } = useContext(UploadContext);
  const { loaded } = useContext(CounterContext);
  return (
    <div>
      {loaded} / {files.length}
    </div>
  );
};

export default Counter;
