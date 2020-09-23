import './scss/index.scss'
import Fetch from './script/Fetch'
import Table from './script/Table'
import {
    formatMoneyInput
} from './script/utils'
import {
    createId
} from './script/utils'
const url = 'https://rawgit.com/Varinetz/e6cbadec972e76a340c41a65fcc2a6b3/raw/90191826a3bac2ff0761040ed1d95c59f14eaf26/frontend_test_table.json'
const rootTable = document.querySelector('.tableRoot')
const fetch = new Fetch(url)


fetch.getAuto()
    .then(list => {
        const table = new Table(rootTable)
        table.render(list)
        const priseInput = document.querySelector('.input--price')
        priseInput.addEventListener('input', (evt) => {
            evt.preventDefault()
            if (evt.inputType === 'deleteContentBackward') {
                evt.preventDefault()
                console.log(evt.target.value)
            } else {
                const price = formatMoneyInput(evt.target.value)
                evt.target.value = price
            }



        })
        document.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('form__delet-item')) {
                const item = evt.target.closest('tr')
                table.deletItem(item.dataset.id)
            }
            if (evt.target.classList.contains('btn--submit')) {
                evt.preventDefault()
                try {
                    const form = document.querySelector('form')
                    const formData = new FormData(form)
                    const newItem = {}
                    const color = form.querySelector('.color-item--active').dataset.color

                    for (let key of formData.keys()) {
                        console.log(`${key}: ${formData.get(key)}`);
                        newItem[key] = formData.get(key)
                    }
                    newItem.color = color
                    newItem.id = createId()
                    table.addItem(newItem)

                } catch (e) {
                    console.log('Ошибка валидации', e)
                }
            }
            if (evt.target.classList.contains('color-item') && evt.target.closest('form')) {
                document.querySelector('form')
                    .querySelectorAll('.color-item')
                    .forEach(el => el.classList.remove('color-item--active'))
                evt.target.classList.add('color-item--active')
            }
        })
    })