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
      className={`absolute -top-12 left-0  w-full rounded border border-red-400 bg-red-100 px-4 py-3 text-center text-red-700 ${
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
