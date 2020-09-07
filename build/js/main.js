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
                console.log(customSelectField.querySelector('select'));
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
    let qty = document.querySelector('.qty'),
        counter = qty.querySelector('input')
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

}

/*  tovar counter btns      */

/*  tab  switcher       */

if (document.querySelector('.tabs')){
    document.querySelectorAll('.tabs').forEach( tabs => {
        tabs.querySelectorAll('.links li').forEach( (elem, index) => {
            console.log(elem)
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