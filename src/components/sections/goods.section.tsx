import React, { useRef, useState } from 'react';
import ItemCard from "../item.card";
import "./goods.section.css";

import arrowDown from "../../assets/img/arrow-down.svg";
import Button from "../button";

import arrowIcon from "../../assets/img/arrow-right.svg";
import arrowIconWhite from "../assets/img/arrow-right-white.svg";
import iconAppleWhite from "../../assets/img/apple-white.svg";
import iconAppleBlack from "../../assets/img/apple-black.svg";
import dressWhite from "../../assets/img/dresswhite.svg";
import dressBlack from "../../assets/img/dressblack.svg";
import clothes from "../../assets/img/img.png";
import { scrollTo, useOnScreen } from "../../tools";
import classNames from "classnames";
import { useGetProductsQuery } from "../../redux/products.api";
import { TDevice } from "../../types";
import Loader from "../loader";

const GoodsSection = () => {
  const [currentModel, setCurrentModel] = useState<TDevice>("AirPods 3");
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

  const handleModelChange = (model: TDevice, button: string) => {
    setCurrentModel(model);
    setActiveButton(button);
  };

  const filtered = products
      ? products
          .filter((el) => el.device === currentModel)
          //@ts-ignore
          .sort((a, b) => a.in_development - b.in_development)
      : [];

  return (
      <section className={"goods"} id="goods">
        <div className={"wrapper goods__wrapper"}>
          <div
              className={classNames("goods__top", { refHidden: !titleSeen })}
              ref={titleRef}
          >
            <h2 className="goods__title">Ассортимент</h2>
            <Button
                className="goods__switch switch"
                variant={activeButton === "all" ? "black" : "white"}
                onClick={() => handleModelChange("AirPods 3", "all")}
            >
              Все
            </Button>

            <Button
                className="goods__switch switch"
                variant={activeButton === "accessories" ? "black" : "white"}
                onClick={() => handleModelChange("AirPods 3", "accessories")}
            >
              <img
                  src={
                    activeButton === "accessories" ? iconAppleWhite : iconAppleBlack
                  }
                  alt="Apple Icon"
              />
              Аксессуары
            </Button>
            <Button
                className="goods__switch switch"
                variant={activeButton === "clothes" ? "black" : "white"}
                onClick={() => handleModelChange("AirPods Pro", "clothes")}
            >
              <img
                  src={
                    activeButton === "clothes" ? dressWhite : dressBlack
                  }
                  alt="Dress Icon"
              />
              Одежда
            </Button>
          </div>
          <div
              className={classNames("goods__list", { refHidden: !goodsSeen })}
              ref={goodsRef}
          >
            {!!products && !isLoading && (
                <>
                  {filtered.map((el, i) =>
                      i < 4 ? <ItemCard key={el.id} {...el} animationDelay={i * 80} /> : null
                  )}
                  {filtered.map((el, i) =>
                      opened && i >= 4 ? (
                          <ItemCard key={el.id} {...el} animationDelay={i * 80} />
                      ) : null
                  )}
                </>
            )}
          </div>
          <div className="df">

          </div>

          {isLoading && <Loader />}

          {filtered.length > 4 && (
              <Button
                  variant="white"
                  onClick={handleClick}
                  className={classNames("goods__button", { opened })}
              >
                К полному каталогу{" "}
                <img src={arrowDown} className="goods__button-icon" alt="Arrow Down" />
              </Button>
          )}
        </div>
      </section>
  );
};

export default GoodsSection;
