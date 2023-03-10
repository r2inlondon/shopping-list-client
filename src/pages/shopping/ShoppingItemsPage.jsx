import { useParams, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useEffect, Fragment, useState, useRef } from "react";
import AddProductForm from "../../components/AddProductForm";
import ReModal from "../../components/ReModal";

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
        isMounted && setListItems(response.data);
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

  return (
    <Fragment>
      <div className="flex justify-between">
        <button
          onClick={() => navigate("/home/ListPage/")}
          className="inline-flex justify-center border border-transparent bg-slate-300 py-2 px-4 text-sm font-medium text-black shadow-sm hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Home
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
        <ul>
          {listItems.map((item) => (
            <li key={item.id}>{item.product.name}</li>
          ))}
        </ul>
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
