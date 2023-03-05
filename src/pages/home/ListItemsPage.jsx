import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Fragment, useState, useRef } from "react";
import { useEffect } from "react";

const ListItemsPage = () => {
  let { listId } = useParams();
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
  });

  return (
    <Fragment>
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

export default ListItemsPage;
