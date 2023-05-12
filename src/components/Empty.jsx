import emptyCart from "../assets/empty_cart.png";

const EmptyBg = ({ title }) => (
  <div>
    <img src={emptyCart} alt="empty car" />
    <p>Your {title} page is empty</p>
  </div>
);

export default EmptyBg;
