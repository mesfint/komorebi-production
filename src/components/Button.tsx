import { ReactNode } from "react";
import clsx from "clsx";

type Size = "small" | "large";

const sizes: Record<Size, string> = {
  //some  of the styles are copied from the caption
  large:
    "py-5 px-20  rounded-[18px] bg-violet-blue hover:bg-periwinkle hover:text-raisin-black duration-300 transition-all  text-white uppercase text-base font-semibold   text-raisin-black",
  small:
    "py-5  px-[18px]  rounded-[18px] bg-violet-blue hover:bg-periwinkle hover:text-raisin-black duration-300 transition-all bg-violet-blue text-white uppercase text-base font-semibold   text-raisin-black",
};

type ButtonProps = {
  children?: ReactNode | ReactNode[];
  size?: Size;
} & JSX.IntrinsicElements["button"]; //to include the disable button

function Button({
  children,
  size = "large",
  disabled,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        sizes[size],
        {
          "bg-silver hover:bg-silver hover:text-black cursor-not-allowed":
            disabled,
        },
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
