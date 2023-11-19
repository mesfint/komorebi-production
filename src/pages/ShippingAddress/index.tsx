import Text from "../../components/Text";
import Button from "../../components/Button";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import Icon from "../../components/icons";
import useGlobalStore from "../../store";
import { getCartTotal } from "../../helpers";
import { ICartItem } from "../../types";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";

// type FormData = {
//   name: string;
//   email: string;
//   city: string;
//   address: string;
// };

type OrderDetailsType = {
  user: {
    name: string;
    email: string;
  };
  deliveryAddress: {
    address: string;
    city: string;
  };
  orderItems: ICartItem[];
};

function ShippingAddress() {
  const {
    register,
    // setValue,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const { cart, updateClientSecret } = useGlobalStore();
  const cartTotal = getCartTotal(cart);

  const navigate = useNavigate();

  const onSubmit = handleSubmit(async () => {
    //  const onSubmit = handleSubmit(async (data) => {
    try {
      const { address, city, email, name } = getValues();
      const orderDetails: OrderDetailsType = {
        deliveryAddress: {
          address,
          city,
        },
        user: {
          email,
          name,
        },
        orderItems: cart,
      };

      const response = await axios.post("/orders", {
        ...orderDetails,
      });
      console.log(response);
      updateClientSecret(response.data.clientSecret);
      navigate("/checkout/payment");
      //updateClientSecret(response.data.clientSecret);
      //navigate("/checkout/payment");
    } catch (error) {
      console.log("error", error);
    }
  });
  //console.log(errors);

  return (
    <section className="mx-[50px] my-[82px]">
      <Text variant="heading-three">Shipping address</Text>
      <div className=" grid grid-cols-2">
        <form className="max-w-xl" onSubmit={onSubmit}>
          {/* name and email */}
          <div className="flex space-x-[18px]  ">
            <div className="flex flex-col items-start space-y-3 w-full">
              <label htmlFor="name" className="text-base font-bold">
                name
              </label>
              <input
                id="name"
                type="text"
                placeholder="name"
                {...register("name", {
                  required: true,
                  maxLength: 20,
                })}
                className={clsx("p-5 rounded-[18px] border border-silver", {
                  "focus: outline-red focus:ring-red": errors.name,
                })}
              />
              {errors.name && (
                <span className="flex space-x-3">
                  <Icon name="ExclamationTriangle" />
                  <span className="text-red">Required field</span>
                </span>
              )}
            </div>
            <div className="flex flex-col items-start space-y-3 ">
              <label htmlFor="email" className="text-base font-bold">
                Email
              </label>
              <input
                id="email"
                type="text"
                {...register("email", {
                  required: true,
                  maxLength: 20,
                })}
                placeholder="email"
                className={clsx("p-5 rounded-[18px]  border border-silver", {
                  "focus: outline-red focus:ring-red": errors.email,
                })}
              />
              {errors.email && (
                <span className="flex space-x-3">
                  <Icon name="ExclamationTriangle" />
                  <span className="text-red">Required field</span>
                </span>
              )}
            </div>
          </div>
          {/* postal code */}
          <div className=" flex flex-col items-start">
            <label
              htmlFor="postalCode"
              className="text-base font-bold mt-[28px] mb-[12px]"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              placeholder="City"
              {...register("city", {
                required: true,
                minLength: 5,
                maxLength: 6,
              })}
              className={clsx(
                "p-5 rounded-[18px] border border-silver w-full",
                {
                  "focus: outline-red focus:ring-red": errors.city,
                }
              )}
            />
            {errors.city && (
              <span className="flex space-x-3">
                <Icon name="ExclamationTriangle" />
                <span className="text-red">Required field</span>
              </span>
            )}
          </div>
          {/* address */}
          <div className=" flex flex-col items-start ">
            <label
              htmlFor="address"
              className="text-base font-bold mt-[28px] mb-[12px]"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              {...register("address", {
                required: true,
                maxLength: 56,
              })}
              placeholder="address"
              className={clsx(
                "p-5 rounded-[18px] border border-silver w-full",
                {
                  "focus: outline-red focus:ring-red": errors.address,
                }
              )}
            />
            {errors.address && (
              <span className="flex space-x-3">
                <Icon name="ExclamationTriangle" />
                <span className="text-red">Required field</span>
              </span>
            )}
          </div>
          <div className=" flex justify-end">
            <Button size="small" className="mt-7 mx-[68px]" type="submit">
              CONTINUE TO PAYMENT
            </Button>
          </div>
        </form>

        <div className="">
          <div className="space-y-7">
            {cart.map((cartItem) => {
              return (
                <div className="flex items-start" key={cartItem.id}>
                  <img
                    src={cartItem.image}
                    width={170}
                    height={170}
                    className="w-[170px] h-[170px] rounded-[18px] mr-[46px]"
                    alt=""
                  />
                  <div className="flex justify-between flex-1">
                    <Text variant="subheading-three">{cartItem.name}</Text>
                    <Text variant="subheading-three">
                      $ {cartItem.price} X {cartItem.quantity}
                    </Text>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-10 flex justify-between">
            <Text variant="body-three">Subtotal</Text>
            <Text variant="subheading-three">$ {cartTotal}</Text>
          </div>
          <div className="mt-10 flex justify-between">
            <Text variant="body-three">Shipping</Text>
            <Text variant="subheading-three">Free</Text>
          </div>
          <div className="mt-[46px] mb-10 h-[1.8px] bg-black"></div>
          <div className="mt-10 flex justify-between">
            <Text variant="body-three">Total</Text>
            <Text variant="subheading-three">$ {cartTotal}</Text>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ShippingAddress;
