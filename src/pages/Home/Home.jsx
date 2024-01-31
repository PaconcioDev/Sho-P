import "./Home.css";
import { useEffect, useState } from "react";

function Home() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3030/shop-api/v2/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  if (products?.length > 0) {
    return (
      <main>
        {products.map((product) => (
          <div>
            <img src={product.image}></img>
          </div>
        ))}
      </main>
    );
  } else {
    return (
      <p>Right now we don't have any products available, come back later!</p>
    );
  }
}

export { Home };
