import "./ProductDetail.css";
import { useContext } from "react";
import { ProductsContext } from "../../context/ProductsContext";
import { useParams } from "react-router-dom";
import { Card } from "../../components/Card/Card.jsx";
import { normalizeString } from "../../utils/normalizeString.js";

function ProductDetail() {
  const { products } = useContext(ProductsContext);
  const { productName } = useParams();

  const product = products.find(
    (product) => normalizeString(productName) === normalizeString(product.name)
  );

  return (
    <>
      <main className="product__container">
        <section className="product__image-container">
          <img src={product?.image} />
        </section>
        <div className="product__info-container">
          <section className="product__title-info">
            <h1 className="product__name">{product?.name}</h1>
            <span className="product__price">$ {product?.price}</span>
          </section>
          <section className="product__purchase-info">
            <button className="product__btn" type="submit">
              ADD TO CART
            </button>
            <p className="product__desc">{product?.description}</p>
          </section>
        </div>
      </main>
      <aside className="related-products__container">
        <hr />
        <h2 className="related-products__title">Related Products</h2>
        {/* //TODO: Make slider without scrollbar for desktop and mobile */}
        <section className="related-products__slider">
          {products
            .filter(
              (p) =>
                p.name
                  .toLowerCase()
                  .split(" ")
                  .some((word) =>
                    product.name.toLowerCase().split(" ").includes(word)
                  ) && p.name !== product.name
            )
            .map((p) => (
              <Card key={p.id} data={p} />
            ))}
        </section>
      </aside>
    </>
  );
}

export { ProductDetail };
