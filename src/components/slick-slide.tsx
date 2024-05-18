import React, { useState } from 'react';
import './slick-slide.css';

// Жестко заданные пути к изображениям иконок, фонов и продуктов
import bgIllustrationBlack from "../assets/img/main-page-bgi-1.svg";
import bgIllustrationWhite from "../assets/img/main-page-bgi-2.svg";
import arrowIcon from "../assets/img/arrow-right.svg";
import arrowIconWhite from "../assets/img/arrow-right-white.svg";
<<<<<<< HEAD
import logoBlack from "../assets/img/img_black.png";
import logoWhite from "../assets/img/img_white.png";
=======
import logo from "../assets/img/img.png";
>>>>>>> main

// Импортируем компонент кнопки
import Button from './button';

// Определяем тип Props для компонента Slide
type Props = {
    variant: "black" | "white"; // Вариант слайда может быть "black" или "white"
    link: string; // Ссылка для кнопки на слайде
};

// Основной компонент Slide
const Slide = ({ variant, link }: Props) => {
    // Состояние для отображения индикатора загрузки изображения
    const [wait, setWait] = useState(true);

    return (
        <div className={`slide ${variant} ${wait}`}>
            <img src={variant === "black" ? bgIllustrationBlack : bgIllustrationWhite} alt="" className="slide__illustration" />

            <div className="center1">
                <div className="dfff">
                    <div className="item1">
                        <div className="center">
                            <h2 className={`h2 ${variant === "white" ? "text-black" : "text-white"}`}>
                                Одежда и
                                аксессуары от
                                ASCE APPAREL
                            </h2>
                        </div>

                        <div className="center">
                            <h3 className={variant === "white" ? "text-black" : "text-white"}>
                                Меняем взгляд и отношение к street wear в России.
                            </h3>
                        </div>

                        <div className="center">
<<<<<<< HEAD
                            <Button
                                variant={variant === "black" ? "white" : "black"}
                                className={`slide__link ${variant}`}
                            >
=======
                            <Button variant={variant === "black" ? "white" : "black"}
                                    className={`slide__link ${variant}`}
                                    >
>>>>>>> main
                                Приобрести{" "}
                                <img src={variant === "black" ? arrowIcon : arrowIconWhite} className="slide__link-arrow"/>
                            </Button>
                        </div>
                    </div>

                    <div className="item2">
<<<<<<< HEAD
                        <img className="imm" src={variant === "black" ? logoBlack : logoWhite} alt=""/>
=======
                    <img className="imm" src={logo} alt=""/>
>>>>>>> main
                    </div>
                </div>
            </div>
            <div className="slide__box">
            </div>
        </div>
    );
};

export default Slide;
