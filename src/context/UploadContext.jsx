import { createContext, useState, useEffect } from "react";

export const UploadContext = createContext({
  files: [],
  setFiles: () => [],
  accessToken: "",
  isLoading: false,
  setIsLoading: () => false,
});

export const UploadProvider = ({ children }) => {
  const searchParams = new URLSearchParams(window.location.href);
  const [accessToken, setAccessToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    for (const key of searchParams.keys()) {
      if (key.includes("#access_token")) {
        setAccessToken(searchParams.get(key));
      }
    }
  }, []);

  const [files, setFiles] = useState([]);

  const value = {
    files,
    setFiles,
    accessToken,
    isLoading,
    setIsLoading,
  };

  return (
    <UploadContext.Provider value={value}>{children}</UploadContext.Provider>
  );
};
