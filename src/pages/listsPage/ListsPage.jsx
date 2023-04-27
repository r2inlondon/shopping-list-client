import { useState, useEffect, useRef, Fragment } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import ReModal from "../../components/ReModal";
import AddListForm from "./AddListForm";
import LogoutButton from "../../components/LogoutButton";
import EllipsisVerticalMenu from "../../components/EllipsisVerticalMenu";
import useAuth from "../../hooks/useAuth";
import { Transition } from "@headlessui/react";

const ListsPage = () => {
  const [userLists, setUsersLists] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const effectRun = useRef(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState("");
  const [listPreviousName, setListPreviousName] = useState({});
  const { setAuth } = useAuth();
  const [isShowing, setIsShowing] = useState(true);

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

    getUserLists();

    return () => {
      isMounted = false;
      controller.abort();
      // effectRun.current = true;
    };
  }, [isLoading]);

  const createList = async (newListName) => {
    setListPreviousName({});
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

  const updateList = async (id, name) => {
    try {
      const response = await axiosPrivate.put(`lists/${id}`, {
        name,
      });
      const updatedUserLists = userLists.map((list) => {
        if (list.id == response.data.id) list.name = response.data.name;
        return list;
      });
      setUsersLists(updatedUserLists);
      setShowModal(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleListToRename = (listId) => {
    const listToRename = userLists.find((list) => list.id == listId);
    setListPreviousName(listToRename);
    setShowModal(true);
  };

  const handleCancelModal = () => {
    setListPreviousName({});
    setShowModal(false);
  };

  const deleteList = async (id) => {
    try {
      await axiosPrivate.delete(`/lists/${id}`);
      const updatedUserLists = userLists.filter((list) => list.id !== id);
      setUsersLists(updatedUserLists);
    } catch (err) {
      console.error(err.message);
    }
  };

  const navigateToList = (listId, listName) => {
    setAuth((prevState) => ({
      ...prevState,
      listName,
    }));
    setIsShowing(false);

    setTimeout(() => {
      navigate(`/home/ListPage/${listId}`);
    }, 300);
  };

  return (
    <Fragment>
      <Transition
        appear={isShowing}
        show={isShowing}
        enter="transform duration-500"
        enterFrom={"translate-x-14 opacity-0"}
        enterTo="translate-x-0 opacity-100"
        leave="transform duration-500"
        leaveFrom="translate-x-0"
        leaveTo={"filter translate-x-8 opacity-0"}
      >
        <div className="flex justify-end mb-4 md:mb-6">
          <button
            onClick={() => setShowModal(true)}
            className=" inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-btn-color hover:bg-btn-color-hover text-base font-semibold text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto text-sm md:text-lg transition-colors duration-200"
          >
            New List +
          </button>
        </div>
        <div className="flex justify-center items-center">
          {userLists?.length ? (
            <ul className="w-full">
              {userLists.map((list) => (
                <li
                  key={list.id}
                  className="flex mb-8 hover:scale-105 duration-300 "
                >
                  <div
                    onClick={() => navigateToList(list.id, list.name)}
                    className="w-full inline-flex justify-center bg-primary-color py-2 px-4 text-sm font-medium text-black focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 cursor-pointer"
                  >
                    <p className="text-md md:text-xl font-bold">{list.name}</p>
                  </div>
                  <EllipsisVerticalMenu
                    deleteList={deleteList}
                    listId={list.id}
                    handleListToRename={handleListToRename}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <h3>You don't have any lists, please create one</h3>
          )}
        </div>
      </Transition>
      <LogoutButton />
       <ReModal showModal={showModal}>
          {listPreviousName.id ? (
            <AddListForm
              handleList={updateList}
              handleCancelModal={handleCancelModal}
              listPreviousName={listPreviousName}
            />
          ) : (
            <AddListForm
              handleList={createList}
              handleCancelModal={handleCancelModal}
            />
          )}
        </ReModal>
    </Fragment>
  );
};

export default ListsPage;
