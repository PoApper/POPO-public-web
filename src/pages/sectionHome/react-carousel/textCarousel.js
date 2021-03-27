/**
 * Code From here: https://github.com/layershifter/semantic-ui-react-with-pure-react-carousel
 */

import React from "react";
import {CarouselProvider, Slide, Slider} from "pure-react-carousel";

const TextCarousel = () => (
  <CarouselProvider
    naturalSlideWidth={16}
    naturalSlideHeight={1}
    totalSlides={3}
    isPlaying infinite
    interval={4000}
    style={{width: "100%", height: "20px"}}
  >
    <Slider>
      <Slide>
        <div>
          POPO가 리뉴얼 되었습니다 😆 새로워진 POPO를 경험해보세요!
        </div>
      </Slide>
      <Slide>
        <div>
          POPO는 현재 개발중입니다 🤩 좋은 아이디어가 있다면 제안해주세요!
        </div>
      </Slide>
      <Slide>
        <div>
          POPO의 개발자를 모집합니다 👨‍💻 자세한 내용은 "<a style={{color: "inherit"}} href={"/recruit-developer"}><i>개발자 모집</i></a> "을 참고해주세요!
        </div>
      </Slide>
    </Slider>
  </CarouselProvider>
);

export default TextCarousel;
