import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import useGlobalStore from "../../store";
import CheckoutForm from "../../components/CheckoutForm";
import Text from "../../components/Text";
import { getCartTotal } from "../../helpers";

//All these got from Stripe documentation APP.js
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function Payment() {
  const { cart, clientSecret } = useGlobalStore();
  const cartTotal = getCartTotal(cart);

  //All these got from Stripe documentation APP.js
  //https://stripe.com/docs/payments/quickstart

  const options: StripeElementsOptions = {
    clientSecret,
  };

  return (
    <div className="mx-[50px] my-[82px] flex justify-between gap-0 ">
      <div className="flex-1 ">
        <div className="max-w-2xl">
          {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          )}
        </div>
      </div>

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
  );
}

export default Payment;
