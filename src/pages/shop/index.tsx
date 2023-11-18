import { useEffect, useState } from "react";
import Button from "../../components/Button";
import Text from "../../components/Text";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { IProduct, RawCartItem } from "../../types";
import api from "../../api/axios";
import useGlobalStore from "../../store";

function Shop() {
  const [products, setProducts] = useState<IProduct[]>([]);

  const { addItemToCart } = useGlobalStore();

  const getProducts = async () => {
    try {
      const response = await api.get("/products");
      //console.log(`response.data`, JSON.stringify(response.data, null, 2));
      setProducts(response.data);
    } catch (error) {
      console.log("error in getProducts", error);
    }
  };

  useEffect(() => {
    getProducts();
    return () => {};
  }, []);

  // const addToBag = () => {
  //   navigate("/shop");
  // };

  return (
    <>
      <section className="relative w-full h-[768px] flex items-end">
        <img
          className="absolute -z-10 aspect-[1.6] object-cover"
          src="https://res.cloudinary.com/dbspz5tmg/image/upload/v1679743570/youtube/2023/march/komorebi-development/young-person-wearing-hoodie-mockup_1_2_exnour.png"
        />
        <div className=" mx-[50px] mb-40">
          <Text className="mb-3" variant="heading-three">
            Latest hoodie styles online
          </Text>
          <Text variant="body-two">Suit your unique preferences</Text>
        </div>
      </section>

      <section className="bg-white rounded-t-[50px] ">
        <div className="pt-[82px] mx-[50px]">
          <Text variant="heading-two">Experience comfort and style</Text>
          <Text className="pt-[19px] mb-[80px]" variant="body-two">
            Perfect blend of comfort, style, and quality materials
          </Text>
        </div>
        <div className="grid grid-cols-3 gap-[38px] mb-[180px]">
          {products.slice(3, 9).map((productItem) => {
            return (
              <div
                key={productItem._id}
                className="
            flex items-center flex-col justify-center 
            "
              >
                <Link to={`/shop/${productItem._id}`}>
                  <div className=" rounded-[18px] ">
                    <img
                      width={368}
                      height={368}
                      className="w-[368px] h-[368px] cursor-pointer"
                      src={productItem.image}
                      alt="image"
                    />
                  </div>
                </Link>
                <Text variant="heading-three" className="mt-7 mb-2">
                  {productItem.name}
                </Text>
                <Text variant="body-three">${productItem.price}</Text>

                <Button
                  size="small"
                  className="mt-7"
                  onClick={() => {
                    const cartItem: RawCartItem = {
                      image: productItem.image,
                      name: productItem.name,
                      price: productItem.price,
                      product: productItem._id,
                    };
                    addItemToCart(cartItem);
                    toast.success("Item added to the cart");
                  }}
                >
                  <span className="ml-[10px]">Add to bag</span>
                </Button>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

export default Shop;
