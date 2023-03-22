import { useState, useEffect, useRef, Fragment } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import ReModal from "../../components/ReModal";
import AddListForm from "../../components/AddListForm";

const ListsPage = () => {
  const [userLists, setUsersLists] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const effectRun = useRef(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState("");

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
        if (err.response?.status === 403) {
          // token expired, back to login
          navigate("/", { state: { from: location }, replace: true });
        }
      }
    };

    // Check if useEffect has run the first time
    // if (effectRun.current === false) {
    getUserLists();
    // }

    return () => {
      isMounted = false;
      controller.abort();
      // effectRun.current = true;
    };
  }, [isLoading]);

  const createList = async (newListName) => {
    try {
      const response = await axiosPrivate.post("lists/new", {
        name: newListName,
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
        <AddListForm createList={createList} setShowModal={setShowModal} />
      </ReModal>
    </Fragment>
  );
};

export default ListsPage;
