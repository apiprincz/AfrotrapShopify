import React, { useState, useEffect } from "react";

export const useWindowResize = () => {
  const [width, setWidth] = useState(0);
  const handleWindowResize = () => setWidth(window.innerWidth);
  useEffect(() => {
    setWidth(window.innerWidth || window.matchMedia("(max-width: 765px)"));
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [width]);

  // Return the width so we can use it in our components
  return { width };
};

// export default useWindowResize;
