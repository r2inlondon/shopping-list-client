import React, { useState, useEffect } from "react";

const ErrorMessage = ({ errMsg, setErrMsg }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(false);
    }, 1500);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const handleTransitionEnd = () => {
    setErrMsg("");
  };

  return (
    <div
      className={`w-full absolute -top-12  left-0 bg-red-100 border border-red-400 text-center text-red-700 px-4 py-3 rounded ${
        visible ? "opacity-90" : "opacity-0"
      } transition-opacity duration-1000`}
      role="alert"
      onTransitionEnd={handleTransitionEnd}
    >
      <p className="font-semibold ">{errMsg}</p>
    </div>
  );
};

export default ErrorMessage;
