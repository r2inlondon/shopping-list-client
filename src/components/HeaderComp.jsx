import useAuth from "../hooks/useAuth";

const HeaderComp = () => {
  const { auth } = useAuth();
  return (
    <h1 className="text-3xl">
      {!auth?.listName ? "Shopping List App" : auth.listName}
    </h1>
  );
};

export default HeaderComp;
