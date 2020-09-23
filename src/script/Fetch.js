export default class Fetch {
    constructor(url) {
        this.url = url
    }

    getAuto() {
        return fetch(this.url)
            .then(res => res.json())
            .then(data=>data)
    }
}