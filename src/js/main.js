/*  tovar custom select    */

if (document.querySelector('.custom-select')){
    document.querySelectorAll('.custom-select').forEach( customSelectField=>{       // Выбираем все селекты на странице
        let originalSelectOptions = customSelectField.querySelectorAll('select option'),    // Опшены внутри текущего селекта
            customSelect = document.createElement('div')                                    //  Создаём новый селект
        customSelectField.querySelector('select').style.display = 'none'                    //  Скрываем старый
        customSelect.classList.add('select')

        let hideOptions = function (event){                                                         // Функция для скрытия селекта при нажатии мимо цели
            if (!event.target.closest('.custom-select')) {
                customSelect.classList.remove('active')
                customOptions.classList.remove('active')
                document.removeEventListener('click', hideOptions)
            }
        }
        let customSelected = document.createElement('p')                                    //  Создаём Р который будет показывать текущий выбранный элемент
        customSelected.classList.add('selected')
        customSelect.appendChild(customSelected)                                                    // Добавляем его в кастомный селект
        customSelected.addEventListener('click', ()=>{                                  // Функция для расскрытия селекта, переворота стрелки и нажатии
            if (customOptions.classList.contains('active')){                                        // мимо селекта
                customSelect.classList.remove('active')
                document.removeEventListener('click', hideOptions)
                customOptions.classList.remove('active')
            } else {
                customSelect.classList.add('active')
                customOptions.classList.add('active')
                setTimeout(()=>{
                    document.addEventListener('click', hideOptions)
                })
            }

        })

        let customOptions = document.createElement('div')                                   // Создаём список Опшенов и добавление его в кастомный список
        customOptions.classList.add('options')
        customSelect.appendChild(customOptions)

        originalSelectOptions.forEach( (elem,index) => {                    // Создание кастомного опшена на основе оригинального
            let customOption = document.createElement('p')
            customOption.classList.add('option')
            customOption.innerText = elem.innerText
            customOptions.appendChild(customOption)
            if (elem.selected){
                customSelected.innerText = elem.innerText                                           // Выбранный показываем в теге Р
            }
            customOption.addEventListener('click', (event) => {              // Собитие для передачи выбранного опшена в основной селект
                elem.selected = true
                customSelected.innerText = customOption.innerText
                customSelect.classList.remove('active')
                customOptions.classList.remove('active')
            })
        } )

        customSelectField.prepend(customSelect)
    } )
}

/*  tovar custom select    */

/*  tovar counter btns      */

if (document.querySelector('.qty')){
    document.querySelectorAll('.qty').forEach( qty => {
        let counter = qty.querySelector('input')
        qty.querySelector('.plus').addEventListener('click', (event)=>{
            event.preventDefault();
            counter.value++
        })
        qty.querySelector('.minus').addEventListener('click', (event)=>{
            event.preventDefault();
            if (counter.value > 1 ) {
                counter.value--
            }
        })
    })
}

/*  tovar counter btns      */

/*  tab  switcher       */

if (document.querySelector('.tabs')){
    document.querySelectorAll('.tabs').forEach( tabs => {
        tabs.querySelectorAll('.links li').forEach( (elem, index) => {
            elem.addEventListener('click', () => {
                tabs.querySelectorAll('.links li').forEach( el => {
                    el.classList.remove('current')
                })
                elem.classList.add('current')
                tabs.querySelectorAll('.tab-field .tab').forEach( el => {
                    el.classList.remove('current')
                })
                tabs.querySelectorAll('.tab-field .tab')[index].classList.add('current')
            })
        })
    })
}

/*  tab  switcher       */

/*  tovar calendar events   */

if (document.querySelector('.events-calendar')){
    let allDisabledEL = [];
    document.querySelectorAll('.calendar_raids .raids_raid>div').forEach( el => {
        if (el.classList.contains('disabled')){
            allDisabledEL.push(el)
        }
    })
    let disableCalendarTimes = function(){
        let currentSelectedFraction = document.forms.eventsCalendar.elements.fraction.value,
            anotherFraction = currentSelectedFraction === 'horde' ? 'alliance' : 'horde',
            width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        if (width > 576) {
            document.querySelectorAll(`.calendar_raids .raids_${anotherFraction}>div`).forEach(el => {
                el.classList.remove('active')
                el.classList.add('disabled')
                allDisabledEL.forEach(disabledEl => {
                    disabledEl.classList.add('disabled')
                })
            })
            document.querySelectorAll(`.calendar_raids .raids_${currentSelectedFraction}>div`).forEach(el => {
                el.classList.remove('active')
                el.classList.remove('disabled')
                allDisabledEL.forEach(disabledEl => {
                    disabledEl.classList.add('disabled')
                })
            })
        } else {
            document.querySelector(`.calendar_raids .raids_${anotherFraction}`).style.display = 'none'
            document.querySelector(`.calendar_raids .raids_${currentSelectedFraction}`).style.display = 'grid'
        }
    }
    disableCalendarTimes()
    document.querySelectorAll('.events-calendar .order-form_fraction label').forEach( elem => {
        elem.addEventListener('click', disableCalendarTimes)
    })
    document.querySelector('.events-calendar .calendar_raids').addEventListener('click', function (event){
        if (event.target.closest('.raids_time')){
            if (document.querySelector('.events-calendar .raids_time.active')) {
                document.querySelector('.events-calendar .raids_time.active').classList.remove('active')
            }
            let elem = event.target;
            for ( ; elem && elem !== document; elem = elem.parentNode ) {
                if (elem.classList.contains('raids_time')){
                    if (!elem.classList.contains('disabled')){
                        elem.classList.add('active')
                    }
                    return
                }
            }

        }
    })
}

/*  tovar calendar events   */

/*  header search btn switch    */

if (document.querySelector('.search_button')) {
    document.querySelector('.search_button').addEventListener('click', function () {
        document.querySelector('.user-menu_search').classList.toggle('active')
    })
}

/*  header search btn switch    */

/* header mobile-menu switch    */

if (document.querySelector('.user-menu_mobile-switch')) {
    document.querySelector('.user-menu_mobile-switch').addEventListener('click', function () {
        let checkFlagBtn =  this.classList.contains('active')
        let checkFlag = document.querySelector('.header_mobile-menu').classList.contains('active')
        document.querySelectorAll('.menu-bar').forEach( bar => bar.classList.remove('active'))
        document.querySelectorAll('.menu-bar-btn').forEach(btn => btn.classList.remove('active'))
        checkFlagBtn ? this.classList.remove('active') : this.classList.add('active')
        if(checkFlag) {
            document.querySelector('.header_mobile-menu').classList.remove('active')
            if (window.screen.width <= 767) {
                document.body.classList.remove('hidden')
            }
        } else {
            document.querySelector('.header_mobile-menu').classList.add('active')
            if (window.screen.width <= 767) {
                document.body.classList.add('hidden')
            }
        }
        let mobileMenuCloseFunc = function (event) {
            if (!event.target.closest('.header_mobile-menu') && !event.target.closest('.user-menu_mobile-switch')) {
                document.querySelector('.user-menu_mobile-switch').classList.remove('active')
                document.querySelector('.header_mobile-menu').classList.remove('active')
                document.removeEventListener('click', mobileMenuCloseFunc)
            }
        }
        setTimeout(() => {
            document.addEventListener('click', mobileMenuCloseFunc)
        })
    })
}

/* header mobile-menu switch    */

/* header scroll-fix*/
if (document.querySelector('header')) {
    document.addEventListener('scroll', function () {
        if (pageYOffset > 0) {
            if (document.querySelector('main')) {
                document.querySelector('main').style.marginTop = '55px'
            }
            document.querySelector('header').classList.add('fixed')
            if (document.querySelector('.aside_wrapper') && !document.querySelector('.aside').classList.contains('active')){
                document.querySelector('.aside_wrapper').style.paddingTop = '55px'
            }
        } else {
            if (document.querySelector('main')) {
                document.querySelector('main').style.marginTop = '0'
            }
            document.querySelector('header').classList.remove('fixed')
            if (document.querySelector('.aside_wrapper')) {
                document.querySelector('.aside_wrapper').style.paddingTop = '0'
            }
        }
    })
}

/* header scroll-fix*/

/* header mobile sidebar switcher */

if (document.querySelector('.header_mobile-sidebar-switcher') && document.querySelector('.aside')) {
    document.querySelector('.header_mobile-sidebar-switcher').addEventListener('click', function () {
        let checkFlag = document.querySelector('.aside').classList.contains('active')
        document.querySelectorAll('.menu-bar').forEach( bar => bar.classList.remove('active'))
        document.querySelectorAll('.menu-bar-btn').forEach(btn => btn.classList.remove('active'))
        if(checkFlag) {
            document.querySelector('.aside').classList.remove('active')
            if (window.screen.width <= 767) {
                document.body.classList.remove('hidden')
            }
        } else {
            document.querySelector('.aside').classList.add('active')
            if (window.screen.width <= 767) {
                document.body.classList.add('hidden')
            }
        }
        let asideCloseFunc = function (event) {
            if (!event.target.closest('.aside') && !event.target.closest('.header_mobile-sidebar-switcher')) {
                document.querySelector('.aside').classList.remove('active')
                document.removeEventListener('click', asideCloseFunc)
            }
        }
        setTimeout(() => {
            document.addEventListener('click', asideCloseFunc)
        })
    })
}

/* header mobile sidebar switcher */

/* change color-theme*/
if (document.querySelector('.user-menu_color-theme')) {
    document.querySelector('.user-menu_color-theme').addEventListener('click', function () {
        this.classList.toggle('active')
        document.body.classList.toggle('dark-theme')
    })
}

/* change color-theme*/

/* open/hide seo-text   */

if (document.querySelector('.seo-text_button')) {
    document.querySelector('.seo-text_button').addEventListener('click', function () {
        let seoBlock = document.querySelector('.seo-text_block')
        let seoBlockHeight = parseInt(window.getComputedStyle(seoBlock).getPropertyValue('height'))
        if (seoBlockHeight === 88) {
            seoBlock.classList.remove('shadow')
            seoBlock.style.height = `${seoBlock.scrollHeight}px`
        } else {
            seoBlock.classList.add('shadow')
            seoBlock.style.height = `88px`
        }
    })
}

/* open/hide seo-text   */

/* open/hide on full-size filters  */
if (document.querySelector('.category_filters')) {
    document.querySelectorAll('.filters_filter').forEach( filter => {
        filter.querySelector('.filter_name').addEventListener('click', function () {
            let filterLinks = filter.querySelector('.filter_links')
            let filterLinksHeight = parseInt(window.getComputedStyle(filterLinks).getPropertyValue('height'))
            document.querySelectorAll('.filters_filter').forEach( elem => {
                if (elem.classList.contains('active')) {
                    elem.classList.remove('active')
                    elem.querySelector('.filter_links').style.height = '0'
                    elem.querySelector('.filter_links').style.padding = '0 20px 0'
                }
            })
            filter.classList.toggle('active')
            if (filterLinksHeight === 0) {
                filterLinks.style.height = `${filterLinks.scrollHeight}px`
                filterLinks.style.padding = '15px 20px 10px'
            } else {
                filterLinks.style.height = '0'
                filterLinks.style.padding = '0 20px 0'
            }
        })
    })
}

/* open/hide on full-size   */

/* best-sellers slider  */

if (document.querySelector('.best-sellers_slider')){
    let siema = new Siema({
        selector: '.best-sellers_slider',
        perPage: {
            0: 1,
            1140: 2
        },
        startIndex: 0,
        loop: true
    });
    document.querySelector('.best-sellers_arrows .next').addEventListener('click', () => siema.next())
    document.querySelector('.best-sellers_arrows .prev').addEventListener('click', () => siema.prev())
}

/* best-sellers slider  */

/* boost-timers slider  */

if (document.querySelector('.boost-timers_slider')){
    let siema = new Siema({
        selector: '.boost-timers_slider',
        perPage: {
            0: 1,
            576: 2
        },
        startIndex: 0
    });
    document.querySelector('.top-info_boost-timers .arrows_prev').addEventListener('click', ()=> siema.prev())
    document.querySelector('.top-info_boost-timers .arrows_next').addEventListener('click', ()=> siema.next())
}

/* boost-timers slider  */

/* attention slider  */

if (document.querySelector('.top-info_attention')){
    let siema = new Siema({
        selector: '.top-info_slider',
        duration: 500,
        multipleDrag: false,
        loop: true
    });
    document.querySelector('.top-info_attention .arrows_prev').addEventListener('click', ()=> siema.prev())
    document.querySelector('.top-info_attention .arrows_next').addEventListener('click', ()=> siema.next())
    setInterval( () => siema.next(), 20000)
}

/* attention slider  */

/* calender slider  */

if (document.querySelector('.top-info_calendar')){
    let allElems = document.querySelectorAll('.top-info_calendar .slider_wrapper .grid_elem'),
        rowCount = Math.ceil(allElems.length / 2)
        for (let i = 0; i < rowCount; i++){
            let block = document.createElement('div')
            block.classList.add('grid_row')
            block.appendChild(allElems[(i*2)])
            if (allElems[(i*2)+1] !== undefined) {
                block.appendChild(allElems[(i * 2) + 1])
            }
            document.querySelector('.top-info_calendar .slider_wrapper').appendChild(block)
        }
    let siema = new Siema({
        selector: '.top-info_calendar .slider_wrapper',
        duration: 300,
        perPage: {
            0: 3,
            440: 4,
            576: 5
        }
    });
    document.querySelector('.top-info_calendar .arrows_prev').addEventListener('click', ()=> siema.prev())
    document.querySelector('.top-info_calendar .arrows_next').addEventListener('click', ()=> siema.next())

}

/* calender slider  */

/* boost-timers2 slider  */

if (document.querySelector('.top-info_boost-timers2')){
    let siema = new Siema({
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
    document.querySelector('.top-info_boost-timers2 .arrows_prev').addEventListener('click', ()=> siema.prev())
    document.querySelector('.top-info_boost-timers2 .arrows_next').addEventListener('click', ()=> siema.next())

}

/* boost-timers2 slider  */

/*  menu_list scroll horizontal */

if (document.querySelector('.shop_menu .menu_list')){
    let menuList = document.querySelector('.shop_menu .menu_list'),
        shopMenu = document.querySelector('.shop_menu'),
        menuWrapper = document.querySelector('.shop_menu .menu_wrapper'),
        startCordX = 0
    let addShadowToMenuList = function (){
        menuList.offsetWidth > menuWrapper.offsetWidth ?
            shopMenu.classList.add('shadow', 'shadow-right', 'shadow-left'):
            shopMenu.classList.remove('shadow', 'shadow-right', 'shadow-left');
        menuWrapper.scrollLeft <= 10 ?
            shopMenu.classList.remove('shadow-left') :
            shopMenu.classList.add('shadow-left')           ;
        let shopMenuScrollRight = menuWrapper.scrollWidth - (menuWrapper.scrollLeft + menuWrapper.clientWidth);
        shopMenuScrollRight <= 10 ?
            shopMenu.classList.remove('shadow-right') :
            shopMenu.classList.add('shadow-right')           ;
    }
    addShadowToMenuList()
    window.addEventListener('resize', addShadowToMenuList)
    let mouseMoveMenuList = function (event){
        this.scrollLeft = this.scrollLeft + (startCordX - event.clientX);
        startCordX = event.clientX
        addShadowToMenuList()
    }
    let touchMoveMenuList = function (event) {
        this.scrollLeft = this.scrollLeft + (startCordX - event.touches[0].clientX);
        startCordX = event.touches[0].clientX
        addShadowToMenuList()
    }
    menuList.addEventListener('mousedown', function (){
        menuList.addEventListener('mousemove', mouseMoveMenuList)
    })
    menuList.addEventListener('touchstart', function (){
        menuList.addEventListener('touchmove', touchMoveMenuList)
    })
    menuList.addEventListener('mouseup', function (){
        menuList.removeEventListener('mousemove', mouseMoveMenuList)
        addShadowToMenuList()
    })
    menuList.addEventListener('touchend', function (){
        menuList.removeEventListener('touchmove', touchMoveMenuList)
        addShadowToMenuList()
    })
}

/*  menu_list scroll horizontal */

/* open/hide on full-size   */

if (document.querySelector('.fz_block')) {
    document.querySelectorAll('.fz_block').forEach( fz_block => {
        fz_block.querySelector('.fz_button').addEventListener('click', function () {
            let fz_component = fz_block.querySelector('.fz_component')
            let fz_component_height = parseInt(window.getComputedStyle(fz_component).getPropertyValue('height'))
            if (fz_component_height === 0) {
                fz_component.style.height = `${fz_component.scrollHeight}px`
                fz_block.classList.add('active')
            } else {
                fz_component.style.height = '0'
                fz_block.classList.remove('active')
            }
        })
    })
}

/* open/hide on full-size   */

/* calendar dates slider    */

if (document.querySelector('.raid-calendar_calendar .calendar_dates')){
    document.querySelectorAll('.calendar_dates').forEach( calendar => {
        let nextStep = {
            0: 1,
            587: 7
        },
            dragStep = {
                0: true,
                768: false
        }
        let step,
            draggable
        for (let width in nextStep){
            if (window.screen.width <= width){
                break
            } else {
                step = nextStep[width]
            }
        }
        for (let width in dragStep){
            if (window.screen.width <= width){
                break
            } else {
                draggable = dragStep[width]
            }
        }
        let siema = new Siema({
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
        calendar.querySelector('.arrows_arrow.next').addEventListener('click', () => {
            console.log(document.querySelectorAll('.calendar_dates .dates_slider .dates_date').length, siema.currentSlide)
            siema.next(step)
        })
        calendar.querySelector('.arrows_arrow.prev').addEventListener('click', () => {
            siema.prev(step)
        })
    })
}

/* calendar dates slider    */

/* privacy policy show/hide */

if (document.querySelector('.privacy-policy_text') && window.screen.width <= 576){
    document.querySelector('.privacy-policy_btn').addEventListener('click', function () {
        let privacyBlock = document.querySelector('.privacy-policy_text')
        let privacyBlockHeight = parseInt(window.getComputedStyle(privacyBlock).getPropertyValue('height'))
        if (privacyBlockHeight === 270) {
            privacyBlock.style.height = `${privacyBlock.scrollHeight}px`
        } else {
            privacyBlock.style.height = `270px`
        }
    })
    console.log(1)
}

/* privacy policy show/hide */

/* refund policy show/hide */

if (document.querySelector('.refund-policy_text') && window.screen.width <= 576){
    document.querySelector('.refund-policy_btn').addEventListener('click', function () {
        let refundBlock = document.querySelector('.refund-policy_text')
        let refundBlockHeight = parseInt(window.getComputedStyle(refundBlock).getPropertyValue('height'))
        if (refundBlockHeight === 270) {
            refundBlock.style.height = `${refundBlock.scrollHeight}px`
        } else {
            refundBlock.style.height = `270px`
        }
    })
    console.log(1)
}

/* refund policy show/hide */

/* shop switch  */

if (document.querySelector('.cart-header')) {
    document.querySelector('.user-menu_cart-btn').addEventListener('click', function () {
        let checkFlag = document.querySelector('.cart-header').classList.contains('active')
        document.querySelectorAll('.menu-bar').forEach( bar => bar.classList.remove('active'))
        document.querySelectorAll('.menu-bar-btn').forEach(btn => btn.classList.remove('active'))
        if(checkFlag) {
            document.querySelector('.cart-header').classList.remove('active')
            if (window.screen.width <= 767) {
                document.body.classList.remove('hidden')
            }
        } else {
            document.querySelector('.cart-header').classList.add('active')
            if (window.screen.width <= 767) {
                document.body.classList.add('hidden')
            }
        }
        let cartHeaderCloseFunc = function (event) {
            if (!event.target.closest('.cart-header') && !event.target.closest('.user-menu_cart-btn')) {
                document.querySelector('.cart-header').classList.remove('active')
                document.removeEventListener('click', cartHeaderCloseFunc)
            }
        }
        setTimeout(() => {
            document.addEventListener('click', cartHeaderCloseFunc)
        })
    })
}

/* shop switch  */

/* custom_switcher  */

if (document.querySelector('.custom-switcher')){
    document.querySelectorAll('.custom-switcher').forEach( switcher => {
        switcher.addEventListener('click',  (event) => {
            event.preventDefault()
            if (event.target.closest('.switcher_btn') && !event.target.classList.contains('.active')){
                if (switcher.querySelector('.switcher_btn.active')) {
                    switcher.querySelector('.switcher_btn.active').classList.remove('active')
                }
                event.target.closest('.switcher_btn').classList.add('active')
            }
        })
    })
}

/* custom_switcher  */
