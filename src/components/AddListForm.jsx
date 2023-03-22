import { useState, useRef, useEffect } from "react";

const AddListForm = ({ createList, setShowModal }) => {
  const [newListName, setNewListName] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleList = (e) => {
    e.preventDefault();

    const trimmedNamed = newListName.trim();
    createList(trimmedNamed);
  };

  return (
    <form onSubmit={handleList}>
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
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
      <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <button
          type="submit"
          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
        >
          Submit
        </button>
        <button
          type="button"
          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={() => setShowModal(false)}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddListForm;
