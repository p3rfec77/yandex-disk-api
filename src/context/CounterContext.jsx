import { createContext, useState } from "react";

export const CounterContext = createContext({
  loaded: 0,
  setLoaded: () => 0,
  isUploading: false,
  setIsUploading: () => false,
});

export const CounterProvider = ({ children }) => {
  const [loaded, setLoaded] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const value = {
    loaded,
    setLoaded,
    isUploading,
    setIsUploading,
  };

  return (
    <CounterContext.Provider value={value}>{children}</CounterContext.Provider>
  );
};
