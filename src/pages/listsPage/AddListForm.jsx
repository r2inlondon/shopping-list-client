import { useState, useRef, useEffect } from "react";
import ErrorMessage from "../../components/ErrorMessage";
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
        <div className="px-4 pt-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <input
              className="border border-gray-300 rounded-md p-2 w-full text-sm md:text-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              type="text"
              placeholder="Enter list name"
              required
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              ref={inputRef}
            />
          </div>
        </div>
        <div className="mx-4 sm:mx-0 my-4 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="submit"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 mb-4 bg-btn-color text-sm md:text-lg font-medium text-white hover:bg-btn-color-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:text-sm transition-colors duration-200"
          >
            Submit
          </button>
          <button
            type="button"
            className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 mb-4 bg-white text-sm md:text-lg font-medium text-red-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white  sm:text-sm transition-colors duration-200"
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
