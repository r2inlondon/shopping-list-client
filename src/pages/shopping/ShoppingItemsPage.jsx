import { useParams, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useEffect, Fragment, useState, useRef } from "react";
import AddProductForm from "../../components/AddProductForm";
import ReModal from "../../components/ReModal";
import sortBy from "sort-by";

const ShoppingItemsPage = () => {
  let { listId } = useParams();
  const navigate = useNavigate();
  const [listItems, setListItems] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const effectRun = useRef(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getListItems = async () => {
      try {
        const response = await axiosPrivate.get(`/shopping/${listId}`, {
          signal: controller.signal,
        });
        const allItemsSorted = response.data.sort(sortBy("product.name"));
        isMounted && setListItems(allItemsSorted);
        setIsLoading(false);
        return response;
      } catch (err) {
        console.error(err.message);
      }
    };

    if (effectRun.current) {
      getListItems();
    }

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

  const handleCompleted = async (itemId, completed) => {
    const isCompleted = !completed;

    try {
      await axiosPrivate.put("/shopping", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
        id: itemId,
        completed: isCompleted,
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

  return (
    <Fragment>
      <div className="flex justify-between mb-4">
        <button
          onClick={() => navigate("/home/ListPage/")}
          className="inline-flex justify-center border border-transparent bg-slate-300 py-2 px-4 text-sm font-medium text-black shadow-sm hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Home
        </button>
        <button
          onClick={() => deleteCompleted()}
          className="inline-flex justify-center border border-transparent bg-slate-300 py-2 px-4 text-sm font-medium text-black shadow-sm hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Clear
        </button>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
        >
          Add Product +
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
      {listItems?.length ? (
        listItems.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center py-2 mb-2 bg-lime-100"
          >
            <span>{item.product.name}</span>
            <input
              id="default-checkbox"
              type="checkbox"
              value={item.id}
              checked={item.completed}
              onChange={() => handleCompleted(item.id, item.completed)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
        ))
      ) : (
        <h3>Shopping List is empty</h3>
      )}
      <ReModal showModal={showModal}>
        <AddProductForm addProduct={addProduct} setShowModal={setShowModal} />
      </ReModal>
    </Fragment>
  );
};

export default ShoppingItemsPage;
