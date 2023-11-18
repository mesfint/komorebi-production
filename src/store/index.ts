import { create } from "zustand";
import { ICartItem, RawCartItem } from "../types";
import { createJSONStorage, persist } from "zustand/middleware";
import { nanoid } from "nanoid";

interface IGlobalStore {
  cart: ICartItem[];
  addItemToCart: (newProductItem: RawCartItem) => void;
  removeItemFromCart: (cartItem: ICartItem) => void;
  clientSecret: string | undefined;
  updateClientSecret: (secret: string) => void;
  emptyCart: () => void; //this is used after pay't is successful we empty all cart items
}

const useGlobalStore = create<IGlobalStore>()(
  persist(
    (set, get) => ({
      clientSecret: undefined,
      emptyCart: () => {
        set({
          cart: [],
        });
      },
      updateClientSecret: (secret) => {
        set({
          clientSecret: secret,
        });
      },
      cart: [],
      addItemToCart: (newProductItem: RawCartItem) => {
        const { cart } = get();
        let cartItems: ICartItem[] = [];
        // Find existing product in the cart
        const existingProduct = cart.find(
          (_cartItem) => _cartItem.product === newProductItem.product
        );
        // Update existing product quantity or add a new cart item
        if (existingProduct) {
          cartItems = cart.map((_item) => {
            if (_item.product === newProductItem.product) {
              return {
                ..._item,
                quantity: _item.quantity! + 1, // Added explicit type annotation to quantity
              };
            }
            return _item;
          });
          //update all items
        } else {
          cartItems = [
            ...cart,
            {
              ...newProductItem,
              id: `cart-${nanoid()}`,
              quantity: 1,
            },
          ];
        }
        // Update the global cart state
        set({
          cart: cartItems,
        });
      },

      removeItemFromCart: (cartItem: ICartItem) => {
        const { cart } = get();
        let cartItems: ICartItem[] = [];

        // Find the cart item to be removed
        const existingProduct = cart.find(
          (_cartItem) => _cartItem.id === cartItem.id
        );

        // Remove the cart item or update its quantity
        if (existingProduct) {
          if (existingProduct.quantity === 1) {
            cartItems = cart.filter(
              (_cartItem) => _cartItem.id !== cartItem.id
            );
          } else {
            cartItems = cart.map((_cartItem) => {
              if (_cartItem.id === cartItem.id) {
                return {
                  ..._cartItem,
                  quantity: _cartItem.quantity! - 1, // Added explicit type annotation to quantity
                };
              }
              //if it doesn't much it will return this cart item
              return _cartItem;
            });
          }
        }
        // Update the global cart state

        set({
          cart: cartItems,
        });
      },
    }),
    {
      name: "komorebi-production-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useGlobalStore;
