import { useState, useEffect, useRef } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import AppModal from "../componets/AppModal";

const UserHome = () => {
  const [userLists, setUsersLists] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const effectRun = useRef(false);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUserLists = async () => {
      try {
        const response = await axiosPrivate.get("/lists", {
          signal: controller.signal,
        });
        isMounted && setUsersLists(response.data);
      } catch (err) {
        console.error(err.message);
        navigate("/", { state: { from: location }, replace: true });
      }
    };

    // Check if useEffect has run the first time
    if (effectRun.current) {
      getUserLists();
    }

    return () => {
      isMounted = false;
      controller.abort();
      effectRun.current = true;
    };
  }, []);

  return (
    <div className="h-screen">
      <div className="flex justify-between">
        <h1>Shopping List</h1>
        <button>Modal</button>
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
    </div>
  );
};

export default UserHome;
