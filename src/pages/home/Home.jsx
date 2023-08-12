import { useContext } from "react";
import { ProductContext } from "../../context/ProductContext.jsx";
import { Card } from "../../components/Card/Card.jsx";
import { ProductDetail } from "../../components/ProductDetail/ProductDetail.jsx";
import { CheckoutSideMenu } from "../../components/CheckoutSideMenu/CheckoutSideMenu.jsx";
import React from "react";

function Home() {
  const {
    isProductDetailOpen,
    isCheckoutSideMenuOpen,
    items,
    search,
    setSearch,
    filteredItems,
  } = useContext(ProductContext);

  const renderView = () => {
    const itemsToRender = search ? filteredItems : items;

    if (itemsToRender?.length > 0) {
      return itemsToRender.map((item) => <Card key={item.id} data={item} />);
    } else {
      return (
        <div className="col-span-4 flex justify-center mt-4">
          <p className="font-semibold text-gray-950">There's nothing with that name in here.</p>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-center w-80 relative">
        <h1 className="my-5 text-2xl font-bold text-gray-50 bg-purple-400 p-2 rounded-lg">
          Products
        </h1>
      </div>
      <input
        type="text"
        placeholder="Search a product"
        className="w-80 p-2 mb-4 border border-purple-400 rounded-lg focus:outline-none"
        onChange={(event) => setSearch(event.target.value)}
      />
      <div className="grid gap-6 grid-cols-4 w-full max-w-screen-lg">
        {renderView()}
      </div>
      {isCheckoutSideMenuOpen && <CheckoutSideMenu />}
      {isProductDetailOpen && <ProductDetail />}
    </div>
  );
}

export { Home };
