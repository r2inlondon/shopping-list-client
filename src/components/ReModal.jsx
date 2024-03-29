import React from "react";

const ReModal = ({ showModal, children }) => {
  return (
    <>
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div
            className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
            // onClick={handleModalClick}
          >
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 backdrop-blur-sm brightness-50"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div
              className="relative inline-block align-bottom bg-white rounded-lg text-left  shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full md:max-w-md"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReModal;
