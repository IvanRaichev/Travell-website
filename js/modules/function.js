export function isWebp() {
   function testWebP(callback) {

      var webP = new Image();
      webP.onload = webP.onerror = function () {
         callback(webP.height == 2);
      };
      webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
   }

   testWebP(function (support) {

      if (support == true) {
         document.querySelector('body').classList.add('webp');
      } else {
         document.querySelector('body').classList.add('no-webp');
      }
   });

}

export function rating() {

   const ratings = document.querySelectorAll('.rating')
   if (ratings.length > 0) {
      initRatings();
   }

   function initRatings() {
      let ratingActive, ratingValue;
      for (let index = 0; index < ratings.length; index++) {
         const rating = ratings[index];
         initRating(rating);
      }

      function initRating(rating) {
         initRatingVars(rating)

         setRatingActiveWidth();

         if (rating.classList.contains('rating__set')) {
            setRating(rating);
         }
      }

      function initRatingVars(rating) {
         ratingActive = rating.querySelector('.rating__active');
         ratingValue = rating.querySelector('.rating__value');
      }

      function setRatingActiveWidth(index = ratingValue.innerHTML) {
         const ratingActiveWidth = index / 0.05;
         ratingActive.style.width = `${ratingActiveWidth}%`;
      }

      function setRating(rating) {

         const ratingItems = rating.querySelectorAll('.rating__item');
         for (let index = 0; index < ratingItems.length; index++) {
            const ratingItem = ratingItems[index];

            ratingItem.addEventListener('mouseenter', function (e) {
               initRatingVars(rating)
               setRatingActiveWidth(ratingItem.value);
            });

            ratingItem.addEventListener('mouseleave', function (e) {
               setRatingActiveWidth();
            });

            ratingItem.addEventListener('click', function (e) {
               initRatingVars(rating)

               if (rating.dataset.ajax) {
                  setRatingValue(ratingItem.value, rating);

               } else {
                  ratingValue.innerHTML = index + 1;
                  setRatingActiveWidth();
               }
            });
         }
      }
   }
}

export function tabs() {
   const tabsBtn = document.querySelectorAll(".tabs__nav-btn");
   const tabsItems = document.querySelectorAll(".tabs__item");

   tabsBtn.forEach(onTabClick);

   function onTabClick(item) {
      item.addEventListener("click", function () {
         let currentBtn = item;
         let tabId = currentBtn.getAttribute("data-tab");
         let currentTab = document.querySelector(tabId);

         if (!currentBtn.classList.contains('active')) {
            tabsBtn.forEach(function (item) {
               item.classList.remove('active');
            });

            tabsItems.forEach(function (item) {
               item.classList.remove('active');
            });

            currentBtn.classList.add('active');
            currentTab.classList.add('active');
         }
      });
   }

   document.querySelector('.tabs__nav-btn').click();



}

export function popup() {
   const popupLinks = document.querySelectorAll('.popup-link');
   const body = document.querySelector('.body');
   const lockPadding = document.querySelectorAll(".lock-padding");

   let unlock = true;

   const timeout = 800;

   if (popupLinks.length > 0) {
      for (let index = 0; index < popupLinks.length; index++) {
         const popupLink = popupLinks[index];
         popupLink.addEventListener("click", function (e) {
            const popupName = popupLink.getAttribute('href').replace('#', '');
            const curentPopup = document.getElementById(popupName);

            popupOpen(curentPopup)
            e.preventDefault();
         })
      }
   }
   const popupCloseIcon = document.querySelectorAll('.close-popup');
   if (popupCloseIcon.length > 0) {
      for (let index = 0; index < popupCloseIcon.length; index++) {
         const el = popupCloseIcon[index];
         el.addEventListener('click', function (e) {
            popupClose(el.closest('.popup'));
            e.preventDefault();
         })
      }
   }

   function popupOpen(curentPopup) {
      if (curentPopup && unlock) {
         const popupActive = document.querySelector('.popup.open');
         if (popupActive) {
            popupClose(popupActive, false);
         } else {
            bodyLock();
         }
         curentPopup.classList.add('open');
         curentPopup.addEventListener("click", function (e) {
            if (!e.target.closest('.popup__content')) {
               popupClose(e.target.closest('.popup'));
            }
         });
      }
   }

   function popupClose(popupActive, doUnlock = true) {
      if (unlock) {
         popupActive.classList.remove('open');
         if (doUnlock) {
            bodyUnLock();
         }
      }
   }

   function bodyLock() {
      const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
      if (lockPadding.length > 0) {
         for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = lockPaddingValue;
         }
      }
      document.querySelector('body').style.paddingRight = lockPaddingValue;
      document.querySelector('body').classList.add('lock');

      unlock = false;
      setTimeout(function () {
         unlock = true;
      }, timeout);
   }

   function bodyUnLock() {
      setTimeout(function () {
         for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = "0px";
         }
         document.querySelector("body").style.paddingRight = "0px";
         document.querySelector("body").classList.remove("lock");
      }, 0);

      unlock = false;
      setTimeout(function () {
         unlock = true;
      }, timeout);

   }

   document.addEventListener('keydown', function (e) {
      if (e.which === 27) {
         const popupActive = document.querySelector('.popup.open');
         popupClose(popupActive);
      }
   })
}

export function select() {

   let selectHeader = document.querySelectorAll('.select__header');
   let selectItem = document.querySelectorAll('.select__item');

   selectHeader.forEach(item => {
      item.addEventListener('click', selectToggle)
   });

   selectItem.forEach(item => {
      item.addEventListener('click', selectChoose)
   });

   function selectToggle() {
      this.parentElement.classList.toggle('is-active');
   }

   function selectChoose() {
      let text = this.innerText,
         select = this.closest('.select'),
         currentText = select.querySelector('.select__current');
      currentText.innerText = text;
      select.classList.remove('is-active');

   }
}

export function burgerMenu() {
   const menu = document.querySelector('.nav__burger-menu');
   const menuBtn = document.querySelector('.nav__burger');
   const body = document.body;

   if (menu && menuBtn) {

      menuBtn.addEventListener('click', () => {
         menu.classList.toggle('active');
         menuBtn.classList.toggle('active');
         body.classList.toggle('lock');
      })

      menu.addEventListener('click', e => {
         if (e.target.classList.contains('nav__burger-menu')) {
            menu.classList.remove('active');
            menuBtn.classList.remove('active');
            body.classList.remove('lock');
         }
      })
   }
}

export function stopVideoFrame() {
   document.addEventListener("DOMContentLoaded", function () {
      let videoFrames = document.querySelectorAll(".videoFrame");
      let stopVideoButtons = document.querySelectorAll(".popup__close");
      stopVideoButtons.forEach(function (button, index) {
         button.addEventListener("click", function () {

            let videoFrame = videoFrames[index];
            if (videoFrame) {
               let videoSrc = videoFrame.src;

               if (videoSrc.indexOf("youtube.com") !== -1) {
                  videoFrame.src = videoSrc.replace("autoplay=1", "");
               } else if (videoSrc.indexOf("vimeo.com") !== -1) {
                  let player = $f(videoFrame);
                  player.api("pause");
               }
            }
         });
      });
   });

}


export function scrollAnimate() {
   const scrollItems = document.querySelectorAll('.scroll-item');

   const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
         if (entry.isIntersecting) {
            entry.target.classList.add('animation-class');
         } else {
            entry.target.classList.remove('animation-class');
         }
      });
   });

   scrollItems.forEach(el => {
      observer.observe(el);
   });
}
