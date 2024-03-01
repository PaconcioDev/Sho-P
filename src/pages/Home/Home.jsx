import "./Home.css";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ProductsContext } from "../../context/ProductsContext.jsx";
import { CategoriesContext } from "../../context/CategoriesContext.jsx";
import { Card } from "../../components/Card/Card.jsx";
import { NotFound } from "../NotFound/NotFound.jsx";
import { normalizeString } from "../../utils/normalizeString.js";

function Home() {
  const { categoryFilter, setCategoryFilter, categories } =
    useContext(CategoriesContext);
  const { products } = useContext(ProductsContext);

  //* Filter category by route
  const { categoryParam } = useParams();
  const normalizedCategoryParam = normalizeString(categoryParam);

  useEffect(() => {
    setCategoryFilter({
      name: normalizedCategoryParam,
    });
  }, [categoryParam]);

  //* Render function
  const renderView = () => {
    if (categories?.length > 0) {
      const isCategoryReal =
        normalizedCategoryParam === "all"
          ? normalizedCategoryParam
          : categories.find(
              (category) =>
                normalizeString(category.name) === normalizedCategoryParam
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
            normalizeString(product.category.name) === categoryFilter.name
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
