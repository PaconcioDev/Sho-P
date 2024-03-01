import "./ProductDetail.css";
import { useContext } from "react";
import { ProductsContext } from "../../context/ProductsContext";
import { useParams } from "react-router-dom";
import { normalizeString } from "../../utils/normalizeString.js";

function ProductDetail() {
  const { products } = useContext(ProductsContext);
  console.log(products);
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
        <section className="product__title-info">
          <h1 className="product__name">{product?.name}</h1>
          <span className="product__price">$ {product?.price}</span>
        </section>
        <section className="product__form-container">
          <form action="">
            <button className="product__btn" type="submit">
              ADD TO CART
            </button>
          </form>
        </section>
        <section className="product__desc">
          <p>{product?.description}</p>
        </section>
      </main>
      <aside>{/* TODO: Related Products */}</aside>
    </>
  );
}

export { ProductDetail };
