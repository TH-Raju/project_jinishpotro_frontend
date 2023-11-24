import { useEffect } from "react";

const useTitle = (title) => {
  useEffect(() => {
    document.title = `${title} - Tech Tutor`;
  }, [title]);
};

export default useTitle;
