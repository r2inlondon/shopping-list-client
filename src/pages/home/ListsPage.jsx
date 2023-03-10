import { useState, useEffect, useRef } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import AppModal from "../../componets/AppModal";
import { Fragment } from "react";

const ListsPage = () => {
  const [userLists, setUsersLists] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const effectRun = useRef(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState("");
  const formContent = {
    title: "Enter new list name",
    name: "",
  };

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
        navigate("/", { state: { from: location }, replace: true });
      }
    };

    // Check if useEffect has run the first time
    if (effectRun.current) {
      const response = getUserLists();
      isMounted && setUsersLists(response.data);
    }

    return () => {
      isMounted = false;
      controller.abort();
      effectRun.current = true;
    };
  }, [isLoading]);

  const newList = async ({ name }) => {
    try {
      const response = await axiosPrivate.post("lists/new", {
        name,
      });
      setIsLoading(!isLoading);
    } catch (err) {
      console.error(err.message);
      // navigate("/", { state: { from: location }, replace: true });
    }
  };

  return (
    <Fragment>
      <div className="flex justify-end">
        <button
          onClick={() => setShowModal(true)}
          className=" inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
        >
          New List +
        </button>
      </div>
      <div className="flex justify-center items-center">
        {userLists?.length ? (
          <ul>
            {userLists.map((list) => (
              <li key={list.id}>{list.name}</li>
            ))}
          </ul>
        ) : (
          <h3>You don't have any lists, please create one</h3>
        )}
      </div>

      <AppModal
        showModal={showModal}
        setShowModal={setShowModal}
        formContent={formContent}
        submitEvent={newList}
      />
    </Fragment>
  );
};

export default ListsPage;
