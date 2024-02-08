import { useContext } from "react";
import { BasketContext } from "../context/basketContext";
import BasketItem from "../Components/BasketItem";
import { Link } from "react-router-dom";

const CheckoutPage = () => {
  const { basket, addToBasket, removeFromBasket } = useContext(BasketContext);

  // sepetteki ürün ve ürün fiyatının artışı ve azalışı
  const totalAmount = basket.reduce((total, i) => total + i.amount, 0);

  const totalPrice = basket.reduce((total, i) => total + i.price * i.amount, 0);

  return (
    <div className="container my-5">
      <div className="d-flex flex-column gap-5">
        {/* sepette ürün yoksa //sepet uzunluğu eşitse sıfıra ozaman linke gel*/}
        {basket.length === 0 && (
          <p className="text-center my-5">
            <span className="mx-3">Öncelikle ürün ekleyiniz</span>
            <Link to={"/"}> Ürünler </Link>
          </p>
        )}
        {/* sepette ürün varsa */}
        {basket?.map((item) => (
          <BasketItem
            key={item.id}
            item={item}
            addToBasket={addToBasket}
            removeFromBasket={removeFromBasket}
          />
        ))}
      </div>

      <div className="border p-5 rounded my-5 fs-4">
        <p>
          Sepetteki Ürün: <span className="text-warning">{totalAmount} </span>{" "}
          adet
        </p>
        <p>
          Toplam Fiyat:{" "}
          <span className="text-success">{totalPrice.toFixed(2)} ₺</span>
        </p>
      </div>
    </div>
  );
};
export default CheckoutPage;

//! totalPrice.toFixed(2)} şu işlem fşyatı basar ve fiyatta noktadan sonra en fazla
//! iki rakam basar yani 898.5555555555 değil 898.55 yapar
