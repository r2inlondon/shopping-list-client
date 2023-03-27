import { useState, useRef, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Spinning from "../../components/Spinning";
import Turnstone from "turnstone";

const AddProductForm = ({ addProduct, setShowModal }) => {
  const [product, setProduct] = useState("");
  const inputRef = useRef(null);
  const [submitting, setSubmitting] = useState(false);
  const [productsCatalog, setProductsCatalog] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedNamed = product.trim();

    setSubmitting(true);
    addProduct(trimmedNamed);
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const getPrdocutsCatalog = async () => {
      try {
        const response = await axiosPrivate.get("/products", {
          signal: controller.signal,
        });
        setProductsCatalog(response.data);
      } catch (err) {
        console.error(err.message);
        if (err.response?.status === 403) {
          // token expired, back to login
          navigate("/", { state: { from: location }, replace: true });
        }
      }
    };

    getPrdocutsCatalog();

    return () => {
      controller.abort();
    };
  }, []);

  const listbox = [
    {
      displayField: "name",
      data: productsCatalog,
      searchType: "contains",
    },
  ];

  const turnstoneStyle = {
    input: "w-full border border-gray-300 rounded-md p-2 w-full",
    listbox:
      "w-full bg-white sm:border sm:border-blue-300 sm:rounded text-left sm:mt-2 p-2 sm:drop-shadow-xl",
    highlightedItem:
      "cursor-pointer p-1.5 text-lg overflow-ellipsis overflow-hidden text-slate-700 rounded bg-blue-50",
    item: "cursor-pointer p-1.5 text-lg overflow-ellipsis overflow-hidden text-slate-700",
  };

  return (
    <div className="h-56 w-full">
      {submitting && (
        <div
          role="status"
          className="h-full w-60 flex justify-center items-center m-auto"
        >
          <Spinning msg={"Submitting"} />
        </div>
      )}
      {!submitting && (
        <form onSubmit={handleSubmit}>
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="w-full mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <div className="mt-2">
                  <Turnstone
                    id="fruitveg"
                    onChange={(e) => setProduct(e)}
                    listbox={listbox}
                    matchText={true}
                    placeholder="Type shopping list item"
                    styles={turnstoneStyle}
                    ref={inputRef}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="submit"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:ml-3 sm:text-sm"
            >
              Submit
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-rose-700 text-base font-medium text-white hover:bg-rose-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:text-sm"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddProductForm;
