import React, { useEffect } from "react";
import useGlobalStore from "../../store";
import Text from "../../components/Text";

function Success() {
  const { emptyCart } = useGlobalStore();

  useEffect(() => {
    emptyCart();
  }, []);

  return (
    <div className="h-screen flex items-center justify-center">
      <Text variant="subheading-three">Payment Success</Text>
    </div>
  );
}

export default Success;
