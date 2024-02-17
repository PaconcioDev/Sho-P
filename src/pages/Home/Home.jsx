import "./Home.css";
import { Card } from "../../components/Card/Card.jsx";
import { useEffect, useState } from "react";

function Home() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3030/shop-api/v2/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const renderView = () => {
    if (products?.length > 0) {
      return products.map((product) => <Card key={product.id} data={product} />);
    } else {
      return (
        <p>There's no products right available rigth now, come back later!</p>
      );
    }
  };

  return <main>{renderView()}</main>;
}

export { Home };
