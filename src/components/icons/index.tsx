import ArrowDownIcon from "./ArrowDownIcon";
import ArrowSmallRightIcon from "./ArrowSmallRightIcon";
import CartIcon from "./CartIcon";
import ExclamationTriangleIcon from "./ExclamationTriangle";
import MinusSmallIcon from "./MinusSmallIcon";
import PlusSmallIcon from "./PlusSmallIcon";
import TrashIcon from "./TrashIcon";
import XMarkIcon from "./XMarkIcon";
import Logo from "./Logo";

type IconName =
  | "ArrowDownIcon"
  | "ArrowSmallRightIcon"
  | "CartIcon"
  | "ExclamationTriangle"
  | "MinusSmallIcon"
  | "PlusSmallIcon"
  | "TrashIcon"
  | "XMarkIcon"
  | "Logo";

//If anything in the left handside like this CartIcon: <PlusIcon/> is the Icon w/c is a JSX element
// type IconsType = {
//   [K in IconName]: JSX.Element;
// };

//const variants: Record<Variant, string> = {

//const Icons: Record<IconName, string>

const Icons: Record<IconName, JSX.Element> = {
  ArrowDownIcon: <ArrowDownIcon />,
  ArrowSmallRightIcon: <ArrowSmallRightIcon />,
  CartIcon: <CartIcon />,
  ExclamationTriangle: <ExclamationTriangleIcon />,
  MinusSmallIcon: <MinusSmallIcon />,
  PlusSmallIcon: <PlusSmallIcon />,
  TrashIcon: <TrashIcon />,
  XMarkIcon: <XMarkIcon />,
  Logo: <Logo />,
};

type IconProps = {
  //the name is the key values of the Icons Type
  name: keyof typeof Icons;
};

function Icon({ name }: IconProps) {
  return Icons[name];
}

export default Icon;
