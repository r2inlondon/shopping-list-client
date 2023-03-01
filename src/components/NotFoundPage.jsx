import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-700 mb-2">404</h1>
        <p className="text-lg text-gray-500 mb-4">You shouldn't be here.</p>
        <Link to="/">
          <p className="text-blue-500 hover:text-blue-700">Go back to home</p>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
