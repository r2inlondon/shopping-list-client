import { useState, useRef, useEffect } from "react";
import ErrorMessage from "./ErrorMessage";
import { Fragment } from "react";

const AddListForm = ({
  handleList,
  handleCancelModal,
  listPreviousName = {},
}) => {
  const [newListName, setNewListName] = useState(
    listPreviousName.name ? listPreviousName.name : ""
  );
  const [errMsg, setErrMsg] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedNamed = newListName.trim();

    const whiteSpace = new RegExp(/^\s/);

    if (whiteSpace.test(trimmedNamed) || trimmedNamed.length === 0) {
      setErrMsg("Invalid name");
      return;
    }

    listPreviousName.id
      ? handleList(listPreviousName.id, trimmedNamed)
      : handleList(trimmedNamed);
  };

  return (
    <Fragment>
      {errMsg && <ErrorMessage errMsg={errMsg} setErrMsg={setErrMsg} />}
      <form onSubmit={handleSubmit}>
        <div className="px-4 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <div className="mt-2">
                <input
                  className="border border-gray-300 rounded-md p-2 w-full"
                  type="text"
                  placeholder="Enter list name"
                  required
                  value={newListName}
                  onChange={(e) => setNewListName(e.target.value)}
                  ref={inputRef}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="submit"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Submit
          </button>
          <button
            type="button"
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={() => handleCancelModal()}
          >
            Cancel
          </button>
        </div>
      </form>
    </Fragment>
  );
};

export default AddListForm;
