import { useParams, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Fragment, useState, useRef } from "react";
import { useEffect } from "react";

const ShoppingItemsPage = () => {
  let { listId } = useParams();
  const navigate = useNavigate();
  const [listItems, setListItems] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const effectRun = useRef(false);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getListItems = async () => {
      try {
        const response = await axiosPrivate.get(`/shopping/${listId}`, {
          signal: controller.signal,
        });
        isMounted && setListItems(response.data);
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
  }, []);

  return (
    <Fragment>
      <button
        onClick={() => navigate("/home/ListPage/")}
        className="mb-5 inline-flex justify-center border border-transparent bg-slate-300 py-2 px-4 text-sm font-medium text-black shadow-sm hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      >
        {" "}
        Home
      </button>
      {listItems?.length ? (
        <ul>
          {listItems.map((item) => (
            <li key={item.id}>{item.product.name}</li>
          ))}
        </ul>
      ) : (
        <h3>Shopping List is empty</h3>
      )}
    </Fragment>
  );
};

export default ShoppingItemsPage;
