import { createContext, useState } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import { toast } from "react-toastify";
toast;
//1) context yapısı tanımlama
export const BasketContext = createContext();

//2 context de tutuulan verileri uygulamaya aktaracak bir sağlayıcı bileşeni tanımladık
export function BasketProvider({ children }) {
  const [basket, setBasket] = useLocalStorage("basket", []);

  //sepete ürün eklemek için //buunu yazdıktan sonra card.jsxe gidip abone oluyoruz
  const addToBasket = (newProduct) => {
    // 1) bu üründen sepette varmı kontrol et
    const found = basket.find((i) => i.id === newProduct.id);

    if (found) {
      //2) bu ürün sepette varsa > miktarı 1 arttır
      //a) bulunan ürünün miktarını 1 arttır
      const updated = { ...found, amount: found.amount + 1 };

      // b)sepet dizisindeki eski ürünün yerine güncel halini koy
      //(sepeti dön eğerki itemin id'si eşitse güncellecek olan elemanın id'sine
      //updated.id' ye ozaman updated'ı koy değilse  eleamnın kendisini koy)
      const newBasket = basket.map((item) =>
        item.id === updated.id ? updated : item
      );

      //c) state'i güncelle
      setBasket(newBasket);

      toast.info(`Ürün miktarı arttırıldı (${updated.amount})`);

      //   console.log(updated);
    } else {
      //ürün sepette yoksa > ürünü sepete ekle (miktarını 1e eşitle)
      setBasket([...basket, { ...newProduct, amount: 1 }]);

      toast.success("ürün sepete eklendi");
    }
    console.log(basket);
  };

  //sepetten ürünü kaldırmak için
  const removeFromBasket = (delete_id) => {
    //sepetteki ürünü bul
    const found = basket.find((i) => i.id === delete_id);

    if (found.amount > 1) {
      // console.log("kod çalıştı");
      //miktarı 1'e eşitse > miktarını 1 eksilt
      const updated = { ...found, amount: found.amount - 1 }; //açıklama aşağıda

      // console.log(updated);

      const newBasket = basket.map((i) => (i.id === updated.id ? updated : i));
      // console.log(newBasket);
      setBasket(newBasket);

      toast.info(`Ürün miktarı azaltıldı (${updated.amount})`);
    } else {
      //miktarı 1'e eşitse > ürünü diziden kaldır
      const filtered = basket.filter((i) => i.id !== delete_id);

      setBasket(filtered);

      toast.error(`Ürün sepetten kadırıldı`);
    }
  };

  return (
    <BasketContext.Provider value={{ basket, addToBasket, removeFromBasket }}>
      {children}
    </BasketContext.Provider>
  );
}

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

//! ürün azaltma işleminde: miktar arttırma işleminin neredeyse aynısını yapıyoruz
// 1)bulduğumuz objenin elemanın miktarını bir eksiltmek için önce yeni bir obje tanımlıyoruz
//?{...found,} deriz
// 2)amount değerini güncelliyoruz
//?{...found,amount} (eski objenin bütün verilerini aktarıyoruz)
// 3)amount değerini ise bulduğumuz objenin miktar değeri ne ise bir eksiğine eşitliyoruz
//?{...found, amount: found.amount - 1}
// 4) ve bunada updated yani güncel eleman diyoruz
//? const updated = {...found, amount: found.amount -1}

//! açıklama  amount un yanındaki : iki nokta (burada found objesi var onun)objenin değer tanımıdır
// { id:1, name:'x'} gibi eşitlik tanımlıyoruz

//! ürün azaltıldıktan sonra eskisini kaldırım güncel veriyi sepete koymalıyız
// bunuda map metodu ile yapabiliriz
// eğerki sepetteki bu elemanın, herhangi bir elemanın id si, benim  bu güncellediğim elemanın yani
// updatedin id isine eşitse o zaman bu yeni dizide ekleyeceğin eleman updated elemanı olsun,
// değilse sepetteki eleman ne ise o olsun
//? const newBasket = basket.map((i) => i.id === updated.id ? updated : item
