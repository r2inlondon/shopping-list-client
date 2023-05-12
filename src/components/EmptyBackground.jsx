import createListImg from "../assets/create_list.png";
import emptyCartImg from "../assets/empty_cart.png";

const EmptyBackground = ({ title }) => {
  const isLisPage = title.includes("lists");

  return (
    <div>
      <div className="pt-20 opacity-30">
        {isLisPage ? (
          <img src={createListImg} alt="create list" className="m-auto mb-8" />
        ) : (
          <img src={emptyCartImg} alt="empty cart" className="m-auto mb-8" />
        )}
        <p className="text-center text-2xl text-gray-800">
          Your {title} is empty
        </p>
      </div>
    </div>
  );
};

export default EmptyBackground;
