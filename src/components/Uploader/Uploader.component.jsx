import { useContext } from "react";

import { UploadContext } from "../../context/UploadContext";
import { CounterContext } from "../../context/CounterContext";

import FadeLoader from "react-spinners/FadeLoader";
import ClipLoader from "react-spinners/ClipLoader";

import Counter from "../Counter/Counter.component";

import "./uploader.styles.css";

const Uploader = () => {
  const { files, setFiles, accessToken, isLoading, setIsLoading } =
    useContext(UploadContext);
  const { setLoaded, isUploading, setIsUploading } = useContext(CounterContext);

  const inputHandler = (e) => {
    const file = e.target.files[0];

    const getUrlForUpload = async () => {
      setIsLoading(true);
      const res = await fetch(
        encodeURI(
          `https://cloud-api.yandex.net/v1/disk/resources/upload?path=/${file.name}&overwrite=true`
        ),
        {
          method: "GET",
          headers: {
            Authorization: accessToken,
          },
        }
      )
        .then(async (response) => {
          const json = await response.json();

          file.href = json.href;
          setFiles([...files, file]);
        })
        .catch((rej) => {
          console.log(rej);
        })
        .finally(() => setIsLoading(false));
    };

    getUrlForUpload();
  };

  const formData = new FormData();
  files.forEach((file, i) => {
    formData.append(`file_${i}`, file);
  });

  const uploadOnDisk = async () => {
    setIsUploading(true);
    for (let i = 0; i < files.length; i++) {
      const res = await fetch(files[i].href, {
        method: "PUT",
        body: formData.get(`file_${i}`),
      }).then(() => setFiles(files.filter((file) => file === files[i])));

      setLoaded(i + 1);
    }
    setFiles([]);
    setIsUploading(false);
  };

  return (
    <div className="container">
      <form method="PUT">
        <label className="input-file">
          <input onChange={(e) => inputHandler(e)} type="file" name="file" />
          <span>Выберите файл</span>
        </label>
      </form>

      <div>
        {files.map((file, i) => (
          <h5 key={i}>{file.name}</h5>
        ))}
      </div>
      {isLoading ? (
        <>
          <FadeLoader className="loading" />
        </>
      ) : isUploading ? (
        <>
          <ClipLoader />
          <Counter />
        </>
      ) : (
        files.length > 0 && <button onClick={uploadOnDisk}>загрузить</button>
      )}
    </div>
  );
};

export default Uploader;
