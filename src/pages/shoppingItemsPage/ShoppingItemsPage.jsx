import { useParams, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useEffect, Fragment, useState, useRef } from "react";
import AddProductForm from "./AddProductForm";
import ReModal from "../../components/ReModal";
import sortBy from "sort-by";
import useAuth from "../../hooks/useAuth";
import { Transition } from "@headlessui/react";
import DeleteCompleted from "./DeleteCompleted";
import ErrorMessage from "../../components/ErrorMessage";

const ShoppingItemsPage = () => {
  let { listId } = useParams();
  const navigate = useNavigate();
  const [listItems, setListItems] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const effectRun = useRef(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowing, setIsShowing] = useState(true);
  const [errMsg, setErrMsg] = useState("");
  const { setAuth } = useAuth();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getListItems = async () => {
      try {
        const response = await axiosPrivate.get(`/shopping/${listId}`, {
          signal: controller.signal,
        });
        const allItemsSorted = response.data.sort(
          sortBy("completed", "product.name")
        );
        isMounted && setListItems(allItemsSorted);
        setIsLoading(false);
        return response;
      } catch (err) {
        console.error(err.message);
        if (err.response?.status === 403) {
          // token expired, back to login
          navigate("/", { state: { from: location }, replace: true });
        }
      }
    };

    // if (effectRun.current) {
    getListItems();
    // }

    return () => {
      isMounted = false;
      controller.abort();
      effectRun.current = true;
    };
  }, [isLoading]);

  const addProduct = async (item) => {
    try {
      await axiosPrivate.post("/shopping/new", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
        listId,
        name: item,
      });
      setErrMsg("");
      setIsLoading(true);
    } catch (err) {
      console.error(err.message);
      if (err.response?.status === 409) {
        setErrMsg(`${item} is already on the list`);
      }
    }
    setShowModal(false);
  };

  const handleCompleted = async (itemId, checked) => {
    const newItems = listItems.filter((item) => item.id !== itemId);
    setListItems(newItems);

    try {
      await axiosPrivate.put("/shopping", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
        id: itemId,
        completed: !checked,
      });
      setIsLoading(true);
    } catch (err) {
      console.error(err.message);
    }
  };

  const deleteCompleted = async () => {
    try {
      const response = await axiosPrivate.delete("/shopping/del-completed", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
        listId,
      });
      setIsLoading(true);
    } catch (err) {
      console.error(err.message);
    }
  };

  const backHome = () => {
    setAuth((prevState) => ({
      ...prevState,
      listName: "",
    }));

    setIsShowing(false);

    setTimeout(() => {
      navigate("/home/ListPage/");
    }, 300);
  };

  return (
    <Fragment>
      <Transition
        appear={isShowing}
        show={isShowing}
        enter="transform duration-500"
        enterFrom={"-translate-x-14 opacity-0"}
        enterTo="translate-x-0 opacity-100"
        leave="transform duration-500"
        leaveFrom="translate-x-0"
        leaveTo={"filter -translate-x-8 opacity-0"}
      >
        <div className="mb-4 flex justify-between pt-4 sm:mb-6 sm:pt-6">
          <button
            tabIndex={1}
            onClick={() => backHome()}
            className="inline-flex justify-center border border-transparent bg-btn-color py-2 px-4 text-sm font-medium text-black shadow-sm hover:bg-btn-color-hover focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24 "
              className="transform transition duration-300 hover:scale-125"
              transform="scale(0.8333333333)"
            >
              <path
                fill="white"
                d="m12 20l-8-8l8-8l1.425 1.4l-5.6 5.6H20v2H7.825l5.6 5.6L12 20Z"
              />
            </svg>
          </button>
          <button
            tabIndex={3}
            onClick={() => setShowModal(true)}
            className="inline-flex justify-center rounded-md border border-transparent bg-btn-color px-4 py-2 text-base text-lg font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-btn-color-hover focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto"
          >
            Add item +
          </button>
        </div>
        {errMsg && <ErrorMessage errMsg={errMsg} setErrMsg={setErrMsg} />}
        {listItems.length > 0 &&
          listItems.map((item, index) => {
            if (!item.completed) {
              return (
                <div
                  key={item.id}
                  onClick={() => handleCompleted(item.id, item.completed)}
                  className="mb-2 flex cursor-pointer items-center justify-between bg-primary-color py-2 px-4 duration-300 hover:scale-105 md:mb-4"
                >
                  <span>{item.product.name}</span>
                  <input
                    id={item.id}
                    type="checkbox"
                    value={item.id}
                    checked={item.completed}
                    onChange={() => handleCompleted(item.id, item.completed)}
                    className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                  />
                </div>
              );
            } else {
              return (
                <div
                  key={item.id}
                  onClick={() => handleCompleted(item.id, item.completed)}
                  className="mb-2 flex cursor-pointer items-center justify-between bg-gray-100 px-4 py-2 opacity-50 md:mb-4"
                >
                  <span>{item.product.name}</span>
                  <input
                    id={item.id}
                    type="checkbox"
                    value={item.id}
                    checked={item.completed}
                    onChange={() => handleCompleted(item.id, item.completed)}
                    className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                  />
                </div>
              );
            }
          })}

        {listItems.length === 0 && <h3>Shopping List is empty</h3>}
      </Transition>
      <DeleteCompleted deleteCompleted={deleteCompleted} />
      <ReModal showModal={showModal}>
        <AddProductForm addProduct={addProduct} setShowModal={setShowModal} />
      </ReModal>
    </Fragment>
  );
};

export default ShoppingItemsPage;
