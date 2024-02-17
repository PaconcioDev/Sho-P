import "./Card.css";

function Card({ data }) {
  return (
    <article className="product-card">
      <section className="product-card__info">
        <h3 className="product-card__name">{data.name}</h3>
        <span className="product-card__price">${data.price}</span>
      </section>
      <div className="product-card__image-overlay"></div>
      <img className="product-card__image" src={data.image} />
    </article>
  );
}

export { Card };
