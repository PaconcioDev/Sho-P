import { useState, useEffect, useContext } from "react";
import { ProductContext } from "../../context/ProductContext.jsx";
import { Card } from "../../components/Card/Card.jsx";
import { ProductDetail } from "../../components/ProductDetail/ProductDetail.jsx";
import { API_URL } from "../../api";
import React from "react";

function Home() {
  const [items, setItems] = useState(null);
  const { isProductDetailOpen } = useContext(ProductContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setItems(data);
      } catch (error) {}
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center">
      This is my home
      <div className="grid gap-6 grid-cols-4 w-full max-w-screen-lg">
        {items?.map((item) => (
          <Card key={item.id} data={item} />
        ))}
      </div>
      {isProductDetailOpen && <ProductDetail />}
    </div>
  );
}

export { Home };
