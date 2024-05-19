import React, { useRef, useState } from 'react';
import ItemCard from "../item.card";
import "./goods.section.css";

import arrowDown from "../../assets/img/arrow-down.svg";
import Button from "../button";

import arrowIcon from "../../assets/img/arrow-right-white.svg";
import shop from "../../assets/img/shop.svg";
import iconAppleWhite from "../../assets/img/apple-white.svg";
import iconAppleBlack from "../../assets/img/apple-black.svg";
import dressWhite from "../../assets/img/dresswhite.svg";
import dressBlack from "../../assets/img/dressblack.svg";
import clothes from "../../assets/img/img.png";
import clothes1 from "../../assets/img/img_1.png";
import { scrollTo, useOnScreen } from "../../tools";
import classNames from "classnames";
import { useGetProductsQuery } from "../../redux/products.api";
import Loader from "../loader";




type TProduct = {
  id: string;
  name: string;
  price: number;
  type: string; // Add this line
};


const GoodsSection = () => {
  const [activeButton, setActiveButton] = useState<string>("all");

  const goodsRef = useRef(null);
  const titleRef = useRef(null);
  const { isSeen: titleSeen } = useOnScreen(titleRef);
  const { isSeen: goodsSeen } = useOnScreen(goodsRef, 0.2);
  const [opened, setOpened] = useState(false);
  const { data: products, isLoading } = useGetProductsQuery();

  const handleClick = () => {
    if (opened) {
      setOpened(false);
      scrollTo("goods");
    } else {
      setOpened(true);
    }
  };

  const handleButtonChange = (button: string) => {
    setActiveButton(button);
  };

  const filteredProducts = products
      ? products.filter((el) => {
        if (activeButton === "all") return true;
        return false;
      })
      : [];



  return (
      <section className={"goods"} id="goods">
        <div className={"wrapper goods__wrapper"}>
          <div
              className={classNames("goods__top", {refHidden: !titleSeen})}
              ref={titleRef}
          >
            <h2 className="goods__title">Ассортимент</h2>
            <Button
                className="goods__switch switch"
                variant={activeButton === "all" ? "black" : "white"}
                onClick={() => handleButtonChange("all")}
            >
              Все
            </Button>
            <Button
                className="goods__switch switch"
                variant={activeButton === "accessories" ? "black" : "white"}
                onClick={() => handleButtonChange("accessories")}
            >
              <img
                  src={activeButton === "accessories" ? iconAppleWhite : iconAppleBlack}
                  alt="Apple Icon"
              />
              Аксессуары
            </Button>
            <Button
                className="goods__switch switch"
                variant={activeButton === "clothes" ? "black" : "white"}
                onClick={() => handleButtonChange("clothes")}
            >
              <img
                  src={activeButton === "clothes" ? dressWhite : dressBlack}
                  alt="Dress Icon"
              />
              Одежда
            </Button>
          </div>
          <div
              className={classNames("goods__list", {refHidden: !goodsSeen})}
              ref={goodsRef}
          >
            {!!products && !isLoading && (
                <>
                  {filteredProducts.map((el, i) =>
                      i < 4 ? <ItemCard key={el.id} {...el} animationDelay={i * 80}/> : null
                  )}
                  {filteredProducts.map((el, i) =>
                      opened && i >= 4 ? (
                          <ItemCard key={el.id} {...el} animationDelay={i * 80}/>
                      ) : null
                  )}
                </>
            )}
          </div>
          <div className="dff">
            {activeButton === "accessories" && (
                <a href="#">
                    <div className="case">
                  <div className="centerr">
                    <div className="img">
                      <div className="centerr">
                        <img className="immss" src={clothes1} alt="Case"/>
                      </div>
                      <div className="centerr">
                        <h2 className="h2hh">Mythical Case</h2>
                      </div>
                      <div className="centerr">
                        <button className="but">
                          <img src={shop} alt=""/>
                          Color Red
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="centerr">
                    <h3 className="h3h">1.500₽</h3>
                  </div>
                  <div className="centerr">
                    <Button className="bot" variant="black">
                      Приобрести
                      <img src={arrowIcon} className="slide__link-arrow"/>
                    </Button>
                  </div>
                </div>
                </a>
            )}

            {activeButton === "clothes" && (
                <a href="#">
                   <div className="clothes">

                  <div className="centerr">
                    <div className="img">
                      <div className="centerr">
                        <img className="imms" src={clothes} alt="Clothes"/>
                      </div>
                      <div className="centerr">
                        <h2 className="h2h">Футболка Asce</h2>
                      </div>
                      <div className="centerr">
                        <button className="but">
                          <img src={shop} alt=""/>
                          Color Black
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="centerr">
                    <h3 className="h3h">2.500₽</h3>
                  </div>
                  <div className="centerr">
                    <Button className="bot" variant="black">
                      Приобрести
                      <img src={arrowIcon} className="slide__link-arrow"/>
                    </Button>
                  </div>
                </div>
                </a>
            )}
          </div>
          {isLoading && <Loader/>}

          {filteredProducts.length > 4 && (
              <Button
                  variant="white"
                  onClick={handleClick}
                  className={classNames("goods__button", {opened})}
              >
                К полному каталогу
                <img src={arrowDown} className="goods__button-icon" alt="Arrow Down"/>
              </Button>
          )}
        </div>
      </section>
  );
};


export default GoodsSection;
