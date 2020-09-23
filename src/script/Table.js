export default class Table {
    constructor(root) {
        this.nodeList = []
        this.root = root
        this.status = {
            pednding: 'Ожидается',
            out_of_stock: 'Нет в наличие',
            in_stock: 'В наличие',
        }
        this.color = {
            white: 'color-item--white',
            black: 'color-item--black',
            green: 'color-item--green',
            red: 'color-item--red',
            grey: 'color-item--grey'
        }
    }

    drawBorderBottom() {
        this.nodeList.forEach((el, i) => {
            if (this.nodeList.length - 1 !== i) {
                el.classList.add('borderBottom')
            } else {
                el.classList.remove('borderBottom')
            }
        })
    }

    createTable(el) {
        const item = document.createElement('tr')
        item.setAttribute('data-id', el.id)

        const itemTitle = document.createElement('td')
        const itemTitleParag = document.createElement('p')
        itemTitleParag.textContent = el.title
        itemTitle.append(itemTitleParag)
        if (el.description) {
            const itemTitleSpan = document.createElement('span')
            itemTitleSpan.textContent = el.description
            itemTitle.append(itemTitleSpan)
        }
        const itemYear = document.createElement('td')
        const itemYearParag = document.createElement('p')
        itemYearParag.textContent = el.year
        itemYear.append(itemYearParag)

        const itemColor = document.createElement('td')
        const itemColorElement = document.createElement('div')
        itemColorElement.classList.add('color-item', this.color[el.color])
        itemColor.append(itemColorElement)

        const itemStatus = document.createElement('td')
        const itemStatusParag = document.createElement('p')
        itemStatusParag.classList.add('form__p--text-center')
        itemStatusParag.textContent = this.status[el.status]
        itemStatus.append(itemStatusParag)

        const itemPrice = document.createElement('td')
        const itemPriceParag = document.createElement('p')
        itemPriceParag.classList.add('form__p--text-center')
        itemPriceParag.textContent = el.price
        itemPrice.append(itemPriceParag)
        const itemBtn = document.createElement('td')
        const itemBtnDel = document.createElement('div')
        itemBtnDel.classList.add('form__delet-item')
        itemBtnDel.textContent = 'Удалить'
        itemBtn.append(itemBtnDel)

        item.append(itemTitle, itemYear, itemColor, itemStatus, itemPrice, itemBtn)
        this.root.append(item)
        this.nodeList.push(item)
    }

    addItem(el) {
        this.createTable(el)
        this.drawBorderBottom()
    }

    deletItem(id) {
        let index
        this.nodeList.forEach((el, i) => {
            if (el.dataset.id === id) {
                index = i
                el.remove()
            }
        })
        this.nodeList.splice(index, 1)
        this.drawBorderBottom()
    }

    render(list) {
        list.forEach(el => {
            this.createTable(el)
        })
        this.drawBorderBottom()
        console.log(this.nodeList)
    }
}