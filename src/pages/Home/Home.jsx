import "./Home.css";
import { Card } from "../../components/Card/Card.jsx";
import { useContext, useEffect, useState } from "react";
import { API_URL } from "../../api/apiUrl.js";
import { CategoriesContext } from "../../context/CategoriesContext.jsx";
import { useParams } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState();
  const { categoryFilter, setCategoryFilter, categories } =
    useContext(CategoriesContext);
  const { categoryParam } = useParams();

  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  useEffect(() => {
    setCategoryFilter({
      name: categoryParam,
    });
  }, [categoryParam]);

  const renderView = () => {
    if (categories?.length > 0) {
      const isCategoryReal =
        categoryParam === "all"
          ? categoryParam
          : categories.find(
              (category) =>
                category.name.toLowerCase().split(" ").join("-") ===
                categoryParam
            );
      if (!isCategoryReal) {
        //TODO: Make 404 NotFound component
        return (
          <main className="main">
            <p>404</p>
          </main>
        );
      }
    }
    if (products?.length > 0) {
      const cards = products
        .filter(
          (product) =>
            categoryParam === "all" ||
            product.category.name.toLowerCase().split(" ").join("-") ===
              categoryFilter.name
        )
        .map((product) => <Card key={product.id} data={product} />);

      return <main className="product-card__container">{cards}</main>;
    } else {
      return (
        <main className="main">
          <p>There's no products right available rigth now, come back later!</p>
        </main>
      );
    }
  };

  return <>{renderView()}</>;
}

export { Home };
