import Loader from "../Components/Loader";
import Card from "../Components/Card";
// 1) Bir context Yapısına abone olmamızı sağlar
import { useContext } from "react";

//2) abone olmak istediğimiz contexti çağırıyoruz
import { ProductContext } from "../context/productContext";

const HomePage = () => {
  // context yapısında tutuulan bir veriye projedeki
  // bileşen içerisinde erişmek istiyorsak bileşenden
  // ilgili context yapısına abone oluruz
  const { products, category } = useContext(ProductContext);
  // console.log(gelen_veri);

  return (
    <div className="container">
      <h2 className="my-4">{category && category}</h2>
      <div className="d-flex flex-wrap justify-content-center justify-content-md-between gap-3 gap-md4 my-5">
        {/*Veriler gelmediyse yükleniyor bas */}
        {!products && <Loader />}

        {/*Veriler geldiyse herbiri için kart bas */}
        {products?.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;

//! const gelen_veri = useContext(ProductContext); burada gelen_veri
//!kısmını product context sayfasında axiostan gelen verinedeniyle dğiştirdik
