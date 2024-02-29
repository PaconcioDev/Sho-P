import "./Home.css";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CategoriesContext } from "../../context/CategoriesContext.jsx";
import { Card } from "../../components/Card/Card.jsx";
import { NotFound } from "../../components/NotFound/NotFound.jsx";
import { API_URL } from "../../api/apiUrl.js";

function Home() {
  const { categoryFilter, setCategoryFilter, categories } =
    useContext(CategoriesContext);

  //* Filter category by route
  const { categoryParam } = useParams();
  const normalizedCategoryParam = categoryParam
    .toLowerCase()
    .split(" ")
    .join("-");

  useEffect(() => {
    setCategoryFilter({
      name: normalizedCategoryParam,
    });
  }, [categoryParam]);

  //* Getting Products
  const [products, setProducts] = useState();

  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  //* Render function
  const renderView = () => {
    if (categories?.length > 0) {
      const isCategoryReal =
        normalizedCategoryParam === "all"
          ? normalizedCategoryParam
          : categories.find(
              (category) =>
                category.name.toLowerCase().split(" ").join("-") ===
                normalizedCategoryParam
            );
      if (!isCategoryReal) {
        return (
          <main className="main">
            <NotFound />
          </main>
        );
      }
    }
    if (products?.length > 0) {
      const cards = products
        .filter(
          (product) =>
            normalizedCategoryParam === "all" ||
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
