import { useState, useEffect, useRef } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import ReModal from "../../components/ReModal";
import { Fragment } from "react";

const ListsPage = () => {
  const [userLists, setUsersLists] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const effectRun = useRef(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState("");
  const [newListName, setNewListName] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUserLists = async () => {
      try {
        const response = await axiosPrivate.get("/lists", {
          signal: controller.signal,
        });
        isMounted && setUsersLists(response.data);
        return response;
      } catch (err) {
        console.error(err.message);
        // token expired, back to login
        navigate("/", { state: { from: location }, replace: true });
      }
    };

    // Check if useEffect has run the first time
    if (effectRun.current) {
      getUserLists();
    }

    return () => {
      isMounted = false;
      controller.abort();
      effectRun.current = true;
    };
  }, [isLoading]);

  useEffect(() => {
    if (showModal) {
      inputRef.current.focus();
    }
  }, [showModal]);

  const createList = async (e) => {
    e.preventDefault();
    const trimmedNamed = newListName.trim();

    try {
      const response = await axiosPrivate.post("lists/new", {
        name: trimmedNamed,
      });
      navigate(`/home/ListPage/${response.data.id}`);
    } catch (err) {
      console.error(err.message);
      // navigate("/", { state: { from: location }, replace: true });
    }
  };

  const goToList = (listId) => {
    navigate(`/home/ListPage/${listId}`);
  };

  return (
    <Fragment>
      <div className="flex justify-end">
        <button
          onClick={() => setShowModal(true)}
          className=" inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
        >
          New List +
        </button>
      </div>
      <div className="flex justify-center items-center">
        {userLists?.length ? (
          <ul className="w-full">
            {userLists.map((list) => (
              <li key={list.id}>
                <button
                  onClick={() => goToList(list.id)}
                  className="mb-5 w-full inline-flex justify-center border border-transparent bg-slate-300 py-2 px-4 text-sm font-medium text-black shadow-sm hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  {list.name}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <h3>You don't have any lists, please create one</h3>
        )}
      </div>

      <ReModal showModal={showModal}>
        <form onSubmit={createList}>
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <div className="mt-2">
                  <input
                    className="border border-gray-300 rounded-md p-2 w-full"
                    type="text"
                    placeholder="Enter new list name"
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
      </ReModal>
    </Fragment>
  );
};

export default ListsPage;
