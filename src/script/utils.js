export const createId = () => (new Date()).getTime();

export const formatMoneyInput = (str) => {
    str = str.replace(/\s+/g, '').replace('руб', '');
    return str.split('').reverse().join('')
        .match(/\d{0,3}/g).join(' ')
        .split('').reverse().join('').trim() + ' руб'
}