import { useParams, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useEffect, Fragment, useState, useRef } from "react";
import AddProductForm from "./AddProductForm";
import ReModal from "../../components/ReModal";
import sortBy from "sort-by";
import useAuth from "../../hooks/useAuth";
import { Transition } from "@headlessui/react";

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

  // const onElementAppear = (el, index) => {
  //   const isChecked = el.childNodes[1].checked;
  //   spring({
  //     onUpdate: (val) => {
  //       el.style.opacity = !isChecked ? val : val / 2;
  //       el.style.transform = `scale(${val})`;
  //     },
  //     delay: index * 10,
  //   });
  // };

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
        <div className="flex justify-between mb-4">
          <button
            tabIndex={1}
            onClick={() => backHome()}
            className="inline-flex justify-center border border-transparent bg-btn-color hover:bg-btn-color-hover text-sm font-medium text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 py-2 px-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24 "
              className="transition duration-300 transform hover:scale-125"
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
            className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-btn-color text-base font-medium text-white hover:bg-btn-color-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto text-sm md:text-lg"
          >
            Add item +
          </button>
        </div>
        {errMsg && (
          <p
            className="bg-red-100 border border-red-400 text-red-700 px-4 rounded relative"
            role="alert"
          >
            {errMsg}
          </p>
        )}
        {listItems.length > 0 &&
          listItems.map((item, index) => {
            if (!item.completed) {
              return (
                <div
                  onClick={() => handleCompleted(item.id, item.completed)}
                  className="flex justify-between items-center py-2 mb-2 md:mb-4 px-4 bg-primary-color hover:scale-105 duration-300 cursor-pointer"
                >
                  <span>{item.product.name}</span>
                  <input
                    id={item.id}
                    type="checkbox"
                    value={item.id}
                    checked={item.completed}
                    onChange={() => handleCompleted(item.id, item.completed)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              );
            } else {
              return (
                <div
                  key={item.id}
                  onClick={() => handleCompleted(item.id, item.completed)}
                  className="opacity-50 flex justify-between items-center px-4 py-2 mb-2 md:mb-4 bg-gray-100 cursor-pointer"
                >
                  <span>{item.product.name}</span>
                  <input
                    id={item.id}
                    type="checkbox"
                    value={item.id}
                    checked={item.completed}
                    onChange={() => handleCompleted(item.id, item.completed)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              );
            }
          })}

        {listItems.length === 0 && <h3>Shopping List is empty</h3>}
      </Transition>
      <div className="flex justify-end absolute bottom-10 right-0">
        <button
          tabIndex={2}
          onClick={() => deleteCompleted()}
          className="inline-flex justify-center border border-transparent bg-orange-600 hover:bg-orange-700 py-2 px-4 text-sm font-medium text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 256 256"
          >
            <path
              fill="white"
              d="M208.49 191.51a12 12 0 0 1-17 17L128 145l-63.51 63.49a12 12 0 0 1-17-17L111 128L47.51 64.49a12 12 0 0 1 17-17L128 111l63.51-63.52a12 12 0 0 1 17 17L145 128Z"
            />
          </svg>
        </button>
      </div>
      <ReModal showModal={showModal}>
        <AddProductForm addProduct={addProduct} setShowModal={setShowModal} />
      </ReModal>
    </Fragment>
  );
};

export default ShoppingItemsPage;
