//* Product Detail
import './ProductDetail.css';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ProductsContext } from '../../context/ProductsContext';
import { Card } from '../../components/Card/Card.jsx';
import { normalizeString } from '../../utils/normalizeString.js';

//* Cart
import { useCart } from '../../hooks/useCart.js';

//* Slider
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { SliderArrow } from '../../components/SliderArrow/SliderArrow.jsx';

function ProductDetail () {
  //* Products
  const { products } = useContext(ProductsContext);
  const { productName } = useParams();

  const product = products.find(
    (product) => normalizeString(productName) === normalizeString(product.name)
  );

  const relatedProducts = products.filter((p) =>
    p.name
      .toLowerCase()
      .split(' ')
      .some((word) =>
        product.name.toLowerCase().split(' ').includes(word)
      ) && p.name !== product.name
  );

  //* Cart
  const { cart, addToCart, removeOne } = useCart();
  const productInCart = cart.filter((p) => p?.id === product?.id);

  //* Slider
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    centerMode: true,
    centerPadding: '0.25rem',
    slidesToShow: 5,
    slidesToScroll: 1,
    adaptiveHeight: true,
    prevArrow: <SliderArrow direction={false} />,
    nextArrow: <SliderArrow direction />,
    responsive: [
      {
        breakpoint: 1370,
        settings: {
          slidesToShow: 4
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  return (
    <>
      <main className='product__container'>
        <section className='product__image-container'>
          <img src={product?.image} />
        </section>
        <div className='product__info-container'>
          <section className='product__title-info'>
            <h1 className='product__name'>{product?.name}</h1>
            <span className='product__price'>$ {product?.price}</span>
          </section>
          <section className='product__purchase-info'>
            {productInCart.length <= 0
              ? (
                <button className='product__btn' onClick={() => addToCart(product)}>
                  ADD TO CART
                </button>
                )
              : (
                <div className='product__quantity-container'>
                  <button className='product__btn product__btn--quantity' onClick={() => removeOne(product)}>-</button>
                  <span>
                    {productInCart[0]?.quantity}
                  </span>
                  <button className='product__btn product__btn--quantity' onClick={() => addToCart(product)}>+</button>
                </div>
                )}
            <p className='product__desc'>{product?.description}</p>
          </section>
        </div>
      </main>
      {relatedProducts.length > 0 &&
        <aside className='related-products__container'>
          <hr />
          <h2 className='related-products__title'>Related Products</h2>
          <section className='related-products__slider'>
            <Slider {...sliderSettings}>
              {relatedProducts.map((p) => (
                <Card key={p.id} data={p} />
              ))}
            </Slider>
          </section>
        </aside>}
    </>
  );
}

export { ProductDetail };
