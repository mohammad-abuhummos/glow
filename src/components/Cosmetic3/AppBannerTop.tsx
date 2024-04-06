import React from "react";
import Marquee from "react-fast-marquee";

interface Props {
  props: string;
  textColor: string;
  bgLine: string;
}

const AppBannerTop: React.FC<Props> = ({ props, textColor, bgLine }) => {
  return (
    <>
      <div className={`banner-top ${props}`}>
        <Marquee>
          <div className={`text-button-uppercase px-8 ${textColor}`}>
            Get 10% off on selected items
          </div>
          <div className={`line w-8 h-px ${bgLine}`}></div>
          <div className={`text-button-uppercase px-8 ${textColor}`}>
            New customers save 10% with the code GET10
          </div>
          <div className={`line w-8 h-px ${bgLine}`}></div>
          <div className={`text-button-uppercase px-8 ${textColor}`}>
            Free shipping on all orders over 50JOD
          </div>
          {/* <div className={`line w-8 h-px ${bgLine}`}></div> */}
        </Marquee>
      </div>
    </>
  );
};

export default AppBannerTop;
