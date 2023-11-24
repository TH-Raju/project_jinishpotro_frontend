import { useEffect } from "react";

const useTitle = (title) => {
  useEffect(() => {
    document.title = `${title} - JP`;
  }, [title]);
};

export default useTitle;
