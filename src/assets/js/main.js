import "./modules/accordion.js";
import "./modules/slider.js";
import "./modules/teleport.js";
import "./modules/togglers.js";
import "./modules/floating-blocks.js";
import "./modules/tabs.js";
import "./modules/form.js";


document.documentElement.style.setProperty('--header-height', document.querySelector('.header').clientHeight + 'px');


const resizeObserver = new ResizeObserver((entries) => {
  document.documentElement.style.setProperty('--header-height', entries[0].target.clientHeight + 'px');
});

resizeObserver.observe(document.querySelector('.header'));

/*
import "./modules/marquee.js";
import "./modules/togglers.js";
import "./modules/video.js";
import "./modules/timeSlider.js";

 */

/* import "swiper/css"; */

/*
import "./variables.js";
import "./modules/table_of_content.js";
import "./modules/slider.js";
import "./modules/togglers.js";
import "./modules/scroll.js";
import "./modules/select.js";

// import styles bundle
*/

import "swiper/css";
