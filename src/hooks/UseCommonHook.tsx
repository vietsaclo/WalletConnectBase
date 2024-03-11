import { useEffect, useState } from "react";

const UseCommomHook = () => {
  const [dimension, setDimension] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const updateDimensions = () => {
    setDimension({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }

  useEffect(() => {
    window.addEventListener('resize', updateDimensions);

    return function cleanUp() {
      window.removeEventListener('resize', updateDimensions);
    }
  }, []);

  const UseWindowDimensions = () => {
    return dimension;
  }

  return {
    UseWindowDimensions,
  }
}

export default UseCommomHook;
