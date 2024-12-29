import { useEffect } from "react";

const useDebounce = (
  query: string,
  cb: (query: string) => void,
  time: number
) => {
  useEffect(() => {
    if (!query) return;
    const debounce = setTimeout(() => {
      cb(query);
    }, time);

    return () => clearTimeout(debounce);
  }, [query]);
};
export default useDebounce;
