import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ProductContext } from "../context/productContext";
import { BasketContext } from "../context/basketContext";

const Header = () => {
  const { setCategory } = useContext(ProductContext); // burada usecontextle ürünler yapısına abone olduk
  const [categories, setCategories] = useState([]); //2)
  const { basket } = useContext(BasketContext);

  //apiden kategori verisini al
  useEffect(() => {
    axios // burada apiden modal kısmına bastığımızda categoriler gelsin diye axios ile çağırma işlemi yaptık
      .get("https://fakestoreapi.com/products/categories") //1) burada çağırma işlemi yapıldıktan sonra usestate aktarılır.1)
      .then((res) => setCategories(res.data));
  }, []);

  // sepetteki ürün sayısını hesapla
  const total = basket.reduce((total, product) => total + product.amount, 0);

  return (
    <nav className="navbar navbar-dark bg-black sticky-top navbar-expand-md">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Context Store
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasDarkNavbar"
          aria-controls="offcanvasDarkNavbar"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="offcanvas offcanvas-end text-bg-dark"
          tabindex="-1"
          id="offcanvasDarkNavbar"
          aria-labelledby="offcanvasDarkNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">
              Context Store
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item">
                <NavLink className="nav-link " aria-current="page" to="/">
                  Anasayfa
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/checkout">
                  <span>Sepet</span>
                  <span className="badge bg-danger ms-1">{total}</span>
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="/"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Kategoriler
                </Link>
                <ul className="dropdown-menu dropdown-menu-dark">
                  <li onClick={() => setCategory("all")}>
                    <a className="dropdown-item" href="#">
                      Hepsi
                    </a>
                  </li>
                  {categories?.map(
                    //categories apiden gelen dizideki elemanlar
                    (
                      cat //3) // bizdeki her bir elemana verdiğimiz isim cat
                    ) => (
                      <li onClick={() => setCategory(cat)}>
                        <a className="dropdown-item" href="#">
                          {cat}
                        </a>
                      </li>
                    )
                  )}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Header;

//? navbar-expand-md bu büyük ekranda navbarı geniş şekilde gösteriyor
//? sticky-top  kullanıcı ekranı kaydırdığı zaman navbarın ekranın üstünde
//? üstünde kalmasını saülar

//! NavLink navbardaki öğrelere otomatik active clası verir

// ÖNEMLİ*********
// NAVBARDAKİ KATEGORİ KISMINI TIKLAYINCA AÇILAN ÜRÜN FİLTRESİNİ
//KENDİMİZ YAPABİLİRDİK AMA APİYİ ALDIĞIMIZ FAKE APİ SAYFASI GÜNCELLLEME
// YAPIP BAZI KATEGORİLERİ SİLER VEYA EKLEME YAPARSA BİZİM PROJEDE SORUN OLUR
// O YUZDEN YİNE FAKEAPİNİN CATEGORİLER KISMINI ALDIK SADECE BURADA KULLANCAĞIMIZ İÇİN
// HEADERA YAZDIK
