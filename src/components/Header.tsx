import Logo from "./icons/Logo";
import Icon from "./icons";
import Text from "./Text";
import { Link } from "react-router-dom";
import useGlobalStore from "../store";
import { getCartLength } from "../helpers";

function Header() {
  const { cart } = useGlobalStore();
  const itemsInCart = getCartLength(cart);
  return (
    <header
      className="py-[22px] px-[22px] flex item-center justify-between
    rounded-[26px] my-[18px] mx-[50px] 
    bg-[#f5f5f5] backdrop-blur-[10px]"
    >
      <Link to="/">
        <Logo />
      </Link>
      <div className="flex flex-row items-center space-x-[38px]">
        <Link to="/shop">
          <Text variant="caption-one">Shop</Text>
        </Link>
        <Link to="/about">
          <Text variant="caption-one">about</Text>
        </Link>
        <Link to="/cart" className="relative">
          <Icon name="CartIcon" />
          <span className="absolute top-[-8px] left-5 bg-white rounded-full w-[18px] h-[18px]
          flex items-center justify-center
          ">
            {itemsInCart}
          </span>
        </Link>
      </div>
    </header>
  );
}

export default Header;
