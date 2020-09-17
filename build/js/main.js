"use strict";

/*  tovar custom select    */
if (document.querySelector('.custom-select')) {
  document.querySelectorAll('.custom-select').forEach(function (customSelectField) {
    // Выбираем все селекты на странице
    var originalSelectOptions = customSelectField.querySelectorAll('select option'),
        // Опшены внутри текущего селекта
    customSelect = document.createElement('div'); //  Создаём новый селект

    customSelectField.querySelector('select').style.display = 'none'; //  Скрываем старый

    customSelect.classList.add('select');

    var hideOptions = function hideOptions(event) {
      // Функция для скрытия селекта при нажатии мимо цели
      if (!event.target.closest('.custom-select')) {
        customSelect.classList.remove('active');
        customOptions.classList.remove('active');
        document.removeEventListener('click', hideOptions);
      }
    };

    var customSelected = document.createElement('p'); //  Создаём Р который будет показывать текущий выбранный элемент

    customSelected.classList.add('selected');
    customSelect.appendChild(customSelected); // Добавляем его в кастомный селект

    customSelected.addEventListener('click', function () {
      // Функция для расскрытия селекта, переворота стрелки и нажатии
      if (customOptions.classList.contains('active')) {
        // мимо селекта
        customSelect.classList.remove('active');
        document.removeEventListener('click', hideOptions);
        customOptions.classList.remove('active');
      } else {
        customSelect.classList.add('active');
        customOptions.classList.add('active');
        setTimeout(function () {
          document.addEventListener('click', hideOptions);
        });
      }
    });
    var customOptions = document.createElement('div'); // Создаём список Опшенов и добавление его в кастомный список

    customOptions.classList.add('options');
    customSelect.appendChild(customOptions);
    originalSelectOptions.forEach(function (elem, index) {
      // Создание кастомного опшена на основе оригинального
      var customOption = document.createElement('p');
      customOption.classList.add('option');
      customOption.innerText = elem.innerText;
      customOptions.appendChild(customOption);

      if (elem.selected) {
        customSelected.innerText = elem.innerText; // Выбранный показываем в теге Р
      }

      customOption.addEventListener('click', function (event) {
        // Собитие для передачи выбранного опшена в основной селект
        elem.selected = true;
        customSelected.innerText = customOption.innerText;
        customSelect.classList.remove('active');
        customOptions.classList.remove('active');
      });
    });
    customSelectField.prepend(customSelect);
  });
}
/*  tovar custom select    */

/*  tovar counter btns      */


if (document.querySelector('.qty')) {
  document.querySelectorAll('.qty').forEach(function (qty) {
    var counter = qty.querySelector('input');
    qty.querySelector('.plus').addEventListener('click', function (event) {
      event.preventDefault();
      counter.value++;
    });
    qty.querySelector('.minus').addEventListener('click', function (event) {
      event.preventDefault();

      if (counter.value > 1) {
        counter.value--;
      }
    });
  });
}
/*  tovar counter btns      */

/*  tab  switcher       */


if (document.querySelector('.tabs')) {
  document.querySelectorAll('.tabs').forEach(function (tabs) {
    tabs.querySelectorAll('.links li').forEach(function (elem, index) {
      elem.addEventListener('click', function () {
        tabs.querySelectorAll('.links li').forEach(function (el) {
          el.classList.remove('current');
        });
        elem.classList.add('current');
        tabs.querySelectorAll('.tab-field .tab').forEach(function (el) {
          el.classList.remove('current');
        });
        tabs.querySelectorAll('.tab-field .tab')[index].classList.add('current');
      });
    });
  });
}
/*  tab  switcher       */

/*  tovar calendar events   */


if (document.querySelector('.events-calendar')) {
  var allDisabledEL = [];
  document.querySelectorAll('.calendar_raids .raids_raid>div').forEach(function (el) {
    if (el.classList.contains('disabled')) {
      allDisabledEL.push(el);
    }
  });

  var disableCalendarTimes = function disableCalendarTimes() {
    var currentSelectedFraction = document.forms.eventsCalendar.elements.fraction.value,
        anotherFraction = currentSelectedFraction === 'horde' ? 'alliance' : 'horde',
        width = window.innerWidth > 0 ? window.innerWidth : screen.width;

    if (width > 576) {
      document.querySelectorAll(".calendar_raids .raids_".concat(anotherFraction, ">div")).forEach(function (el) {
        el.classList.remove('active');
        el.classList.add('disabled');
        allDisabledEL.forEach(function (disabledEl) {
          disabledEl.classList.add('disabled');
        });
      });
      document.querySelectorAll(".calendar_raids .raids_".concat(currentSelectedFraction, ">div")).forEach(function (el) {
        el.classList.remove('active');
        el.classList.remove('disabled');
        allDisabledEL.forEach(function (disabledEl) {
          disabledEl.classList.add('disabled');
        });
      });
    } else {
      document.querySelector(".calendar_raids .raids_".concat(anotherFraction)).style.display = 'none';
      document.querySelector(".calendar_raids .raids_".concat(currentSelectedFraction)).style.display = 'grid';
    }
  };

  disableCalendarTimes();
  document.querySelectorAll('.events-calendar .order-form_fraction label').forEach(function (elem) {
    elem.addEventListener('click', disableCalendarTimes);
  });
  document.querySelector('.events-calendar .calendar_raids').addEventListener('click', function (event) {
    if (event.target.closest('.raids_time')) {
      if (document.querySelector('.events-calendar .raids_time.active')) {
        document.querySelector('.events-calendar .raids_time.active').classList.remove('active');
      }

      var elem = event.target;

      for (; elem && elem !== document; elem = elem.parentNode) {
        if (elem.classList.contains('raids_time')) {
          if (!elem.classList.contains('disabled')) {
            elem.classList.add('active');
          }

          return;
        }
      }
    }
  });
}
/*  tovar calendar events   */

/*  header search btn switch    */


if (document.querySelector('.search_button')) {
  document.querySelector('.search_button').addEventListener('click', function () {
    document.querySelector('.user-menu_search').classList.toggle('active');
  });
}
/*  header search btn switch    */

/* header mobile-menu switch    */


if (document.querySelector('.user-menu_mobile-switch')) {
  document.querySelector('.user-menu_mobile-switch').addEventListener('click', function () {
    var checkFlagBtn = this.classList.contains('active');
    var checkFlag = document.querySelector('.header_mobile-menu').classList.contains('active');
    document.querySelectorAll('.menu-bar').forEach(function (bar) {
      return bar.classList.remove('active');
    });
    document.querySelectorAll('.menu-bar-btn').forEach(function (btn) {
      return btn.classList.remove('active');
    });
    checkFlagBtn ? this.classList.remove('active') : this.classList.add('active');

    if (checkFlag) {
      document.querySelector('.header_mobile-menu').classList.remove('active');

      if (window.screen.width <= 767) {
        document.body.classList.remove('hidden');
      }
    } else {
      document.querySelector('.header_mobile-menu').classList.add('active');

      if (window.screen.width <= 767) {
        document.body.classList.add('hidden');
      }
    }

    var mobileMenuCloseFunc = function mobileMenuCloseFunc(event) {
      if (!event.target.closest('.header_mobile-menu') && !event.target.closest('.user-menu_mobile-switch')) {
        document.querySelector('.user-menu_mobile-switch').classList.remove('active');
        document.querySelector('.header_mobile-menu').classList.remove('active');
        document.removeEventListener('click', mobileMenuCloseFunc);
      }
    };

    setTimeout(function () {
      document.addEventListener('click', mobileMenuCloseFunc);
    });
  });
}
/* header mobile-menu switch    */

/* header scroll-fix*/


if (document.querySelector('header')) {
  var mainPadding;

  if (document.querySelector('main')) {
    mainPadding = parseInt(window.getComputedStyle(document.querySelector('main')).getPropertyValue('padding-top'));
  }

  document.addEventListener('scroll', function () {
    if (pageYOffset > 0) {
      if (document.querySelector('main')) {
        document.querySelector('main').style.paddingTop = "".concat(55 + mainPadding, "px");
        document.querySelector('main').classList.add('fixed');
      } else {
        document.querySelector('.bg').style.paddingTop = "55px";
        document.querySelector('.bg').classList.add('fixed');
      }

      document.querySelector('header').classList.add('fixed');

      if (document.querySelector('.aside_wrapper') && !document.querySelector('.aside').classList.contains('active')) {
        document.querySelector('.aside_wrapper').style.paddingTop = '55px';
      }
    } else {
      if (document.querySelector('main')) {
        document.querySelector('main').style.paddingTop = "".concat(mainPadding, "px");
        document.querySelector('main').classList.remove('fixed');
      } else {
        document.querySelector('.bg').style.paddingTop = "0";
        document.querySelector('.bg').classList.remove('fixed');
      }

      document.querySelector('header').classList.remove('fixed');

      if (document.querySelector('.aside_wrapper')) {
        document.querySelector('.aside_wrapper').style.paddingTop = '0';
      }
    }
  });
}
/* header scroll-fix*/

/* header mobile sidebar switcher */


if (document.querySelector('.header_mobile-sidebar-switcher') && document.querySelector('.aside')) {
  document.querySelector('.header_mobile-sidebar-switcher').addEventListener('click', function () {
    var checkFlag = document.querySelector('.aside').classList.contains('active');
    document.querySelectorAll('.menu-bar').forEach(function (bar) {
      return bar.classList.remove('active');
    });
    document.querySelectorAll('.menu-bar-btn').forEach(function (btn) {
      return btn.classList.remove('active');
    });

    if (checkFlag) {
      document.querySelector('.aside').classList.remove('active');

      if (window.screen.width <= 767) {
        document.body.classList.remove('hidden');
      }
    } else {
      document.querySelector('.aside').classList.add('active');

      if (window.screen.width <= 767) {
        document.body.classList.add('hidden');
      }
    }

    var asideCloseFunc = function asideCloseFunc(event) {
      if (!event.target.closest('.aside') && !event.target.closest('.header_mobile-sidebar-switcher')) {
        document.querySelector('.aside').classList.remove('active');
        document.removeEventListener('click', asideCloseFunc);
      }
    };

    setTimeout(function () {
      document.addEventListener('click', asideCloseFunc);
    });
  });
}
/* header mobile sidebar switcher */

/* open/hide seo-text   */


if (document.querySelector('.seo-text_button')) {
  document.querySelector('.seo-text_button').addEventListener('click', function () {
    var seoBlock = document.querySelector('.seo-text_block');
    var seoBlockHeight = parseInt(window.getComputedStyle(seoBlock).getPropertyValue('height'));

    if (seoBlockHeight === 88) {
      seoBlock.classList.remove('shadow');
      seoBlock.style.height = "".concat(seoBlock.scrollHeight, "px");
    } else {
      seoBlock.classList.add('shadow');
      seoBlock.style.height = "88px";
    }
  });
}
/* open/hide seo-text   */

/* open/hide on full-size filters  */


if (document.querySelector('.category_filters')) {
  document.querySelectorAll('.filters_filter').forEach(function (filter) {
    filter.querySelector('.filter_name').addEventListener('click', function () {
      var filterLinks = filter.querySelector('.filter_links');
      var filterLinksHeight = parseInt(window.getComputedStyle(filterLinks).getPropertyValue('height'));
      var eventFlag = false;
      document.querySelectorAll('.filters_filter').forEach(function (elem) {
        if (elem.classList.contains('active')) {
          elem.classList.remove('active');
          elem.querySelector('.filter_links').style.height = '0';
          elem.querySelector('.filter_links').style.padding = '0 20px 0';

          if (eventFlag) {
            document.removeEventListener('click', hideFilter);
          }
        }
      });

      var hideFilter = function hideFilter(event) {
        eventFlag = true;

        if (!event.target.closest('.filters_filter.active')) {
          filter.classList.remove('active');
          filterLinks.style.height = '0';
          filterLinks.style.padding = '0 20px 0';
          document.removeEventListener('click', hideFilter);
        }
      };

      filter.classList.toggle('active');

      if (filterLinksHeight === 0) {
        filterLinks.style.height = "".concat(filterLinks.scrollHeight, "px");
        filterLinks.style.padding = '15px 20px 10px';
      } else {
        filterLinks.style.height = '0';
        filterLinks.style.padding = '0 20px 0';
      }

      setTimeout(function () {
        document.addEventListener('click', hideFilter);
      });
    });
  });
}
/* open/hide on full-size filters  */

/* best-sellers slider  */


if (document.querySelector('.best-sellers_slider')) {
  var siema = new Siema({
    selector: '.best-sellers_slider',
    perPage: {
      0: 1,
      1200: 2
    },
    startIndex: 0,
    loop: true
  });
  document.querySelector('.best-sellers_arrows .next').addEventListener('click', function () {
    return siema.next();
  });
  document.querySelector('.best-sellers_arrows .prev').addEventListener('click', function () {
    return siema.prev();
  });
}
/* best-sellers slider  */

/* boost-timers slider  */


if (document.querySelector('.boost-timers_slider')) {
  var _siema = new Siema({
    selector: '.boost-timers_slider',
    perPage: {
      0: 1,
      576: 2
    },
    startIndex: 0
  });

  document.querySelector('.top-info_boost-timers .arrows_prev').addEventListener('click', function () {
    return _siema.prev();
  });
  document.querySelector('.top-info_boost-timers .arrows_next').addEventListener('click', function () {
    return _siema.next();
  });
}
/* boost-timers slider  */

/* attention slider  */


if (document.querySelector('.top-info_attention')) {
  var _siema2 = new Siema({
    selector: '.top-info_slider',
    duration: 500,
    multipleDrag: false,
    loop: true
  });

  document.querySelector('.top-info_attention .arrows_prev').addEventListener('click', function () {
    return _siema2.prev();
  });
  document.querySelector('.top-info_attention .arrows_next').addEventListener('click', function () {
    return _siema2.next();
  });
  setInterval(function () {
    return _siema2.next();
  }, 20000);
}
/* attention slider  */

/* calender slider  */


if (document.querySelector('.top-info_calendar')) {
  var allElems = document.querySelectorAll('.top-info_calendar .slider_wrapper .grid_elem'),
      rowCount = Math.ceil(allElems.length / 2);

  for (var i = 0; i < rowCount; i++) {
    var block = document.createElement('div');
    block.classList.add('grid_row');
    block.appendChild(allElems[i * 2]);

    if (allElems[i * 2 + 1] !== undefined) {
      block.appendChild(allElems[i * 2 + 1]);
    }

    document.querySelector('.top-info_calendar .slider_wrapper').appendChild(block);
  }

  var _siema3 = new Siema({
    selector: '.top-info_calendar .slider_wrapper',
    duration: 300,
    perPage: {
      0: 3,
      440: 4,
      576: 5
    }
  });

  document.querySelector('.top-info_calendar .arrows_prev').addEventListener('click', function () {
    return _siema3.prev();
  });
  document.querySelector('.top-info_calendar .arrows_next').addEventListener('click', function () {
    return _siema3.next();
  });
}
/* calender slider  */

/* boost-timers2 slider  */


if (document.querySelector('.top-info_boost-timers2')) {
  var _siema4 = new Siema({
    selector: '.top-info_boost-timers2 .boost-timers_slider',
    duration: 300,
    loop: true,
    perPage: {
      0: 1,
      576: 2,
      1281: 1
    },
    multipleDrag: false
  });

  document.querySelector('.top-info_boost-timers2 .arrows_prev').addEventListener('click', function () {
    return _siema4.prev();
  });
  document.querySelector('.top-info_boost-timers2 .arrows_next').addEventListener('click', function () {
    return _siema4.next();
  });
}
/* boost-timers2 slider  */

/*  menu_list scroll horizontal */


if (document.querySelector('.shop_menu .menu_list')) {
  var menuList = document.querySelector('.shop_menu .menu_list'),
      shopMenu = document.querySelector('.shop_menu'),
      menuWrapper = document.querySelector('.shop_menu .menu_wrapper'),
      startCordX = 0;

  var addShadowToMenuList = function addShadowToMenuList() {
    menuList.offsetWidth > menuWrapper.offsetWidth ? shopMenu.classList.add('shadow', 'shadow-right', 'shadow-left') : shopMenu.classList.remove('shadow', 'shadow-right', 'shadow-left');
    menuWrapper.scrollLeft <= 10 ? shopMenu.classList.remove('shadow-left') : shopMenu.classList.add('shadow-left');
    var shopMenuScrollRight = menuWrapper.scrollWidth - (menuWrapper.scrollLeft + menuWrapper.clientWidth);
    shopMenuScrollRight <= 10 ? shopMenu.classList.remove('shadow-right') : shopMenu.classList.add('shadow-right');
  };

  addShadowToMenuList();
  window.addEventListener('resize', addShadowToMenuList);

  var mouseMoveMenuList = function mouseMoveMenuList(event) {
    this.scrollLeft = this.scrollLeft + (startCordX - event.clientX);
    startCordX = event.clientX;
    addShadowToMenuList();
    addShadowToMenuList();
  };

  var touchMoveMenuList = function touchMoveMenuList(event) {
    this.scrollLeft = this.scrollLeft + (startCordX - event.touches[0].clientX);
    startCordX = event.touches[0].clientX;
    addShadowToMenuList();
  };

  menuList.addEventListener('mousedown', function () {
    menuList.addEventListener('mousemove', mouseMoveMenuList);
  });
  menuList.addEventListener('touchstart', function () {
    menuList.addEventListener('touchmove', touchMoveMenuList);
  });
  menuList.addEventListener('mouseup', function () {
    menuList.removeEventListener('mousemove', mouseMoveMenuList);
    addShadowToMenuList();
  });
  menuList.addEventListener('touchend', function () {
    menuList.removeEventListener('touchmove', touchMoveMenuList);
    addShadowToMenuList();
  });
}
/*  menu_list scroll horizontal */

/* open/hide on full-size   */


if (document.querySelector('.fz_block')) {
  document.querySelectorAll('.fz_block').forEach(function (fz_block) {
    fz_block.querySelector('.fz_button').addEventListener('click', function () {
      var fz_component = fz_block.querySelector('.fz_component');
      var fz_component_height = parseInt(window.getComputedStyle(fz_component).getPropertyValue('height'));

      if (fz_component_height === 0) {
        fz_component.style.height = "".concat(fz_component.scrollHeight, "px");
        fz_block.classList.add('active');
      } else {
        fz_component.style.height = '0';
        fz_block.classList.remove('active');
      }
    });
  });
}
/* open/hide on full-size   */

/* calendar dates slider    */


if (document.querySelector('.raid-calendar_calendar .calendar_dates')) {
  document.querySelectorAll('.calendar_dates').forEach(function (calendar) {
    var nextStep = {
      0: 1,
      587: 7
    },
        dragStep = {
      0: true,
      768: false
    };
    var step, draggable;

    for (var width in nextStep) {
      if (window.screen.width <= width) {
        break;
      } else {
        step = nextStep[width];
      }
    }

    for (var _width in dragStep) {
      if (window.screen.width <= _width) {
        break;
      } else {
        draggable = dragStep[_width];
      }
    }

    var siema = new Siema({
      selector: '.calendar_dates .dates_slider',
      duration: 300,
      perPage: {
        0: 3,
        531: 5,
        641: 7,
        992: 10,
        1201: 12,
        1651: 14
      },
      draggable: draggable
    });
    calendar.querySelector('.arrows_arrow.next').addEventListener('click', function () {
      console.log(document.querySelectorAll('.calendar_dates .dates_slider .dates_date').length, siema.currentSlide);
      siema.next(step);
    });
    calendar.querySelector('.arrows_arrow.prev').addEventListener('click', function () {
      siema.prev(step);
    });
  });
}
/* calendar dates slider    */

/* privacy policy show/hide */


if (document.querySelector('.privacy-policy_text') && window.screen.width <= 576) {
  document.querySelector('.privacy-policy_btn').addEventListener('click', function () {
    var privacyBlock = document.querySelector('.privacy-policy_text');
    var privacyBlockHeight = parseInt(window.getComputedStyle(privacyBlock).getPropertyValue('height'));

    if (privacyBlockHeight === 270) {
      privacyBlock.style.height = "".concat(privacyBlock.scrollHeight, "px");
    } else {
      privacyBlock.style.height = "270px";
    }
  });
  console.log(1);
}
/* privacy policy show/hide */

/* refund policy show/hide */


if (document.querySelector('.refund-policy_text') && window.screen.width <= 576) {
  document.querySelector('.refund-policy_btn').addEventListener('click', function () {
    var refundBlock = document.querySelector('.refund-policy_text');
    var refundBlockHeight = parseInt(window.getComputedStyle(refundBlock).getPropertyValue('height'));

    if (refundBlockHeight === 270) {
      refundBlock.style.height = "".concat(refundBlock.scrollHeight, "px");
    } else {
      refundBlock.style.height = "270px";
    }
  });
  console.log(1);
}
/* refund policy show/hide */

/* shop switch  */


if (document.querySelector('.cart-header')) {
  document.querySelector('.user-menu_cart-btn').addEventListener('click', function () {
    var checkFlag = document.querySelector('.cart-header').classList.contains('active');
    document.querySelectorAll('.menu-bar').forEach(function (bar) {
      return bar.classList.remove('active');
    });
    document.querySelectorAll('.menu-bar-btn').forEach(function (btn) {
      return btn.classList.remove('active');
    });

    if (checkFlag) {
      document.querySelector('.cart-header').classList.remove('active');

      if (window.screen.width <= 767) {
        document.body.classList.remove('hidden');
      }
    } else {
      document.querySelector('.cart-header').classList.add('active');

      if (window.screen.width <= 767) {
        document.body.classList.add('hidden');
      }
    }

    var cartHeaderCloseFunc = function cartHeaderCloseFunc(event) {
      if (!event.target.closest('.cart-header') && !event.target.closest('.user-menu_cart-btn')) {
        document.querySelector('.cart-header').classList.remove('active');
        document.removeEventListener('click', cartHeaderCloseFunc);
      }
    };

    setTimeout(function () {
      document.addEventListener('click', cartHeaderCloseFunc);
    });
  });
}
/* shop switch  */

/* custom class switcher  */


if (document.querySelector('.custom-switcher')) {
  document.querySelectorAll('.custom-switcher').forEach(function (switcher) {
    switcher.addEventListener('click', function (event) {
      event.preventDefault();

      if (event.target.closest('.switcher_btn') && !event.target.classList.contains('.active')) {
        if (switcher.querySelector('.switcher_btn.active')) {
          switcher.querySelector('.switcher_btn.active').classList.remove('active');
        }

        event.target.closest('.switcher_btn').classList.add('active');
      }
    });
  });
}
/* custom class switcher  */

/* custom_multiple select   */


if (document.querySelector('.custom-multiple-select')) {
  document.querySelectorAll('.custom-multiple-select').forEach(function (select) {
    select.addEventListener('click', function (event) {
      if (event.target.closest('.custom-multiple-option')) {
        event.target.closest('.custom-multiple-option').classList.toggle('active');
      }
    });
  });
}
/* custom_multiple select   */

/* popup show/hide  */


if (document.querySelector('*[data-popup]')) {
  document.querySelectorAll('.popup').forEach(function (popup) {
    popup.querySelector('.popup_close').addEventListener('click', function (event) {
      event.preventDefault();
      popup.classList.remove('active');
      document.querySelector('.popup-wrapper').classList.remove('active');
    });
  });
  document.querySelector('.popup-wrapper').addEventListener('click', function (event) {
    event.stopPropagation();

    if (this.classList.contains('active') && !event.target.closest('.popup')) {
      this.classList.remove('active');
      document.querySelectorAll('.popup').forEach(function (popup) {
        popup.classList.remove('active');
      });
    }
  });
  document.querySelectorAll('*[data-popup]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelector('.popup-wrapper').classList.add('active');
      document.querySelectorAll('.popup').forEach(function (popup) {
        popup.classList.remove('active');
      });
      document.querySelector(".popup-wrapper .".concat(this.dataset.popup)).classList.add('active');
    });
  });
}
/* popup show/hide  */

/* timer    */


if (document.querySelector('.timer')) {
  document.querySelectorAll('.timer').forEach(function (timer) {
    document.addEventListener("DOMContentLoaded", function () {
      timerInterval = setInterval(timerStart, 1000, timer);
    });
    var timerInterval;

    function timerStart(timerName) {
      var currentTimer = timerName;

      if (currentTimer.querySelector('.hours p')) {
        var hours = parseInt(currentTimer.querySelector('.hours p').innerText);
      }

      if (currentTimer.querySelector('.minute p')) {
        var minute = parseInt(currentTimer.querySelector('.minute p').innerText);
      }

      if (currentTimer.querySelector('.second p')) {
        var second = parseInt(currentTimer.querySelector('.second p').innerText);
      }

      if (currentTimer.querySelector('.millisecond p')) {
        var millisecond = parseInt(currentTimer.querySelector('.millisecond p').innerText);
      }

      var timer = 0;

      if (hours) {
        timer += hours * 60 * 60 * 1000;
      }

      if (minute) {
        timer += minute * 60 * 1000;
      }

      if (second) {
        timer += second * 1000;
      }

      if (millisecond) {
        timer += millisecond * 10;
      }

      if (timer === 0) {
        clearInterval(timerInterval);
      } else {
        timer -= 1000;
      }

      if (currentTimer.querySelector('.hours p')) {
        var result = Math.floor((timer - timer % 3600000) / 3600000);

        while (result.toString().length < 2) {
          result = '0' + result;
        }

        currentTimer.querySelector('.hours p').innerText = result;
      }

      if (currentTimer.querySelector('.minute p')) {
        var _result = Math.floor(timer % 3600000 / 60000);

        while (_result.toString().length < 2) {
          _result = '0' + _result;
        }

        currentTimer.querySelector('.minute p').innerText = _result;
      }

      if (currentTimer.querySelector('.second p')) {
        var _result2 = Math.floor(timer % 60000 / 1000);

        while (_result2.toString().length < 2) {
          _result2 = '0' + _result2;
        }

        currentTimer.querySelector('.second p').innerText = _result2;
      }

      if (currentTimer.querySelector('.millisecond p')) {
        var _result3 = Math.floor(timer % 1000 / 10);

        while (_result3.toString().length < 2) {
          _result3 = '0' + _result3;
        }

        currentTimer.querySelector('.millisecond p').innerText = _result3;
      }
    }
  });
}
/* timer    */

/* change color-theme*/


function checkColorTheme() {
  if (document.querySelector('img[data-dark]')) {
    document.querySelectorAll('img[data-dark]').forEach(function (image) {
      if (document.body.classList.contains('dark-theme')) {
        image.src = image.dataset.dark;
      } else {
        image.src = image.dataset.light;
      }
    });
  }
}

checkColorTheme();

if (document.querySelector('.user-menu_color-theme')) {
  document.querySelector('.user-menu_color-theme').addEventListener('click', function () {
    this.classList.toggle('active');
    document.body.classList.toggle('dark-theme');
    checkColorTheme();
  });
}
/* change color-theme*/