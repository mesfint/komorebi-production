import { useParams } from "react-router-dom";
import Text from "../../components/Text";
import { useEffect, useState } from "react";
import { IProduct, RawCartItem } from "../../types";
import api from "../../api/axios";
import Button from "../../components/Button";
import useGlobalStore from "../../store";

function ProductDetails() {
  const [product, setProduct] = useState<IProduct>();

  //When we click Add to Bag btn in shop page it will redirect us to http://localhost:5173/shop/6552f649ef30c60bf7863bec
  //Therefore we need to extract that specific product id from the url w/c will help us to hit the API and get the details of the product

  const { id } = useParams(); //get the product id from the url

  const { addItemToCart, cart } = useGlobalStore();

  console.log("cart", JSON.stringify(cart, null, 2));

  const getProduct = async () => {
    try {
      // const url = `/products/${id}`;
      // console.log("Request URL:", url);

      const response = await api.get(`/products/${id}`);

      console.log("response.data", JSON.stringify(response.data, null, 2));
      setProduct(response.data);
    } catch (error) {
      console.log("error in getProducts", error);
    }
  };

  useEffect(() => {
    getProduct();
    return () => {};
  }, []);

  return (
    <section className="mt-[82px] ">
      <div className="grid grid-cols-2 gap-10">
        {/* first div */}
        <div>
          <img
            className="h-[618px]  object-cover mb-[180px] mx-[50px]"
            src={product?.image}
            alt="image"
          />
        </div>
        {/* second div */}
        <div>
          <Text variant="heading-one">{product?.name}</Text>
          <Text className="my-[28px]" variant="subheading-two">
            ${product?.price}
          </Text>
          <Text className="mb-[56px]" variant="body-two">
            {product?.description}
          </Text>
          <Button
            size="small"
            className="mt-7"
            onClick={() => {
              if (!product) return;
              const cartItem: RawCartItem = {
                image: product?.image,
                name: product?.name,
                price: product?.price,
                product: product?._id,
              };
              addItemToCart({
                ...cartItem,
              });
            }}
          >
            <span className="ml-[10px]">add to bag</span>
          </Button>
        </div>
      </div>
      <div className="h-[622px] mb-[180px] relative">
        <img
          height={622}
          className="h-[622px] object-cover w-full "
          src="https://res.cloudinary.com/dbspz5tmg/image/upload/v1679743572/youtube/2023/march/komorebi-development/primaryimage_oblfj9.png"
          alt="image"
        />
        <svg
          className="absolute top-[45%] left-[45%]"
          width="200"
          height="78"
          viewBox="0 0 200 78"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.3 28.35H46.7V32.05H3.3V28.35ZM22.95 16.05H26.9V62H22.95V16.05ZM22.1 30.25L25.35 31.35C20.7 41.75 12.6 51.55 4.2 56.7C3.5 55.7 2.25 54.3 1.35 53.5C9.6 49.05 17.85 39.55 22.1 30.25ZM27.65 30.3C32 39.35 40.45 48.85 48.5 53.3C47.55 54.05 46.25 55.55 45.6 56.55C37.45 51.4 29.25 41.45 24.5 31.45L27.65 30.3ZM53.9 19.15L56.15 16.5C58.8 18 62.45 20.25 64.3 21.65L62.05 24.7C60.25 23.15 56.6 20.8 53.9 19.15ZM51.95 32.75L54.05 30.05C56.85 31.45 60.75 33.55 62.7 34.85L60.55 37.95C58.65 36.55 54.75 34.25 51.95 32.75ZM74.1 46.1L75.75 44.35C77.35 45.4 79.5 47 80.55 47.95L78.9 50C77.8 48.9 75.7 47.25 74.1 46.1ZM74 53L75.7 51.35C77.35 52.55 79.5 54.25 80.5 55.35L78.8 57.3C77.7 56.15 75.6 54.35 74 53ZM85.6 45.95L87.15 44.25C88.8 45.35 90.95 46.95 92.05 47.95L90.5 49.95C89.35 48.85 87.25 47.15 85.6 45.95ZM85.3 52.75L86.95 51.05C88.6 52.2 90.7 53.9 91.8 54.95L90.15 56.9C89.05 55.8 86.9 54 85.3 52.75ZM52.5 59.4C54.55 55.5 57.45 48.95 59.45 43.3L62.5 45.3C60.6 50.55 58.05 56.75 55.9 61.4L52.5 59.4ZM70 39.4H94.4V42.35H73.1V61.95H70V39.4ZM68.1 17.8H95.6V28.95H68.1V25.8H92V20.95H68.1V17.8ZM66.1 17.8H69.6V32.25C69.6 40.85 68.85 53.3 63.5 61.75C62.85 61.15 61.4 60.1 60.5 59.75C65.65 51.75 66.1 40.45 66.1 32.25V17.8ZM93.2 39.4H96.45V58.7C96.45 60.3 96.1 61.1 95 61.55C93.85 62 92 62 89.05 62C88.95 61.25 88.5 60.15 88.1 59.35C90.15 59.45 91.95 59.4 92.5 59.4C93.05 59.4 93.2 59.25 93.2 58.7V39.4ZM68.35 32.5H97.25V35.6H68.35V32.5ZM81.45 33.75H84.65V61.7H81.45V33.75ZM148.7 54.2C146 56.9 142.9 58.4 139.5 58.4C136.15 58.4 133.95 56.2 133.95 52.1C133.95 46.5 135.8 38.3 135.8 33.45C135.8 30.55 134.35 29.3 131.8 29.3C127.1 29.3 119.85 35.5 115.15 41.2L115.2 36.25C118.3 32.85 126.6 25.65 132.75 25.65C137.45 25.65 139.75 28.3 139.75 32.35C139.75 37.35 137.85 45.95 137.85 51C137.85 52.7 138.7 54.05 140.5 54.05C142.85 54.05 145.5 52.6 148.05 49.95L148.7 54.2ZM115.1 30.3C113.45 30.55 108.05 31.2 104.35 31.8L103.9 27.65C105 27.7 105.95 27.7 107.2 27.6C109.85 27.45 116.1 26.7 118.4 25.95L119.85 27.65C119 28.95 117.65 31.1 116.8 32.5L115.3 39.35C113 42.9 108.35 49.65 105.2 54L102.7 50.6C105.8 46.7 112.55 37.55 114.5 34.25L114.7 31.65L115.1 30.3ZM114.6 22.05C114.6 20.9 114.65 19.6 114.4 18.35L119.1 18.5C118.4 21.75 116.9 36.05 116.9 44.85C116.9 49.4 116.9 52.45 117.1 56.9C117.15 57.75 117.3 59 117.35 59.95H113.05C113.15 59 113.2 57.8 113.2 57C113.2 52.15 113.25 49.65 113.3 44.15C113.4 39.75 114.6 23.9 114.6 22.05ZM158.8 19.4H191.55V61.25H187.6V23.2H162.65V61.45H158.8V19.4ZM161.35 36.75H189.25V40.45H161.35V36.75ZM161.3 54.45H189.35V58.2H161.3V54.45Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}

export default ProductDetails;
