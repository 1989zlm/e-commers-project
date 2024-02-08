import axios from "axios";
import { createContext, useEffect, useState } from "react"; // kütüphanenin kendinden geliyor bu isim

/*
 ***** CREATECONTEXT CONTEXT APININ REACTTEN GELEN KENDİ ADIDIR****
  * Context API
  * Uygulamada birden çok bileşin ihtiyacı olan verileri
  * Bileşlnlerden bağımsız bir şekilde konumlanan merkezerlde
  * yönetmeye yarar.
  
  * Context yapısı içserinde verilerin state'ini ve verileri değiştirmeye
  * yarayan fonksiyonlar tutulabilir.
  * 
  * Context, tutuğumuz değişkenleri beileşenler doğrudan aktarım yapbilen
  * Merkezi state yönetim aracıdır.

*/

//! CONTEXT YAPISININ TEMELİNİ OLUŞTURMA
//! bu reactın kendi kütüphanesinde buulunuyor context oluiturulacaksa böyle
//! olacak ve const atanarak export edilecek
export const ProductContext = createContext(); //context yapısını oluşturmaya yarar

//! sağlayıcı ve onun tuttuğu verileri tanımla
export function ProductProvider({ children }) {
  const [products, setProducts] = useState(null);
  const [category, setCategory] = useState("all"); // console.log(category);
  //kategori verisi her değiştiğinde istediğimiz kategori gelsin
  //istediğimiz(tıkladığımız) kategori gelsin diye ise buna
  // https://fakestoreapi.com/products/category/jewelery'

  useEffect(() => {
    //önceki ürünleri kaldır > yükleniyorum tetikler
    setProducts(null);
    //hangi url e istek atılacağını belirle
    const url =
      category === "all"
        ? "https://fakestoreapi.com/products"
        : `https://fakestoreapi.com/products/category/${category}`;

    axios // bütün veriler için bu linki kullanıyoruz
      .get(url) // burada apinin ilk cevabını alıyoruz.// burada "https://fakestoreapi.com/products" yazan yere url' getirdik
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err)); // hata gelirse yakala
  }, [category]);

  // conetxt yapısında tuttuğumuz verileri bileşenlere sağlıyoruz
  //yani bileşenlerin erişmesini sağlıyoruz
  //valuue olarak eklenen veriler projedeki bütün bileşenler tarafından
  //erişilebilir olur
  return (
    <ProductContext.Provider value={{ products, category, setCategory }}>
      {children}
    </ProductContext.Provider>
  );
}

/*productContext value= {{ products, category}}> çift parantez yaptık obje tanımlası old.için */

//? product context componeti içerisine app jsx i yazamayız o yüzden
//? mainjsx te bu sayfayı hem import ettik hem app.jsxi tanımladık ve
//? bu sayfada da children olarak yazdık bune hoc yani hıgher order comp.denir

//provider = sağlayıcı
