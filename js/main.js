const products = [
    {id: 1, title: 'Notebook', price: 2000, img: 'images/notebook.jpg'},
    {id: 2, title: 'Mouse', price: 20, img: 'images/mouse.jpg'},
    {id: 3, title: 'Keyboard', price: 200, img: 'images/keyboard.jpg'},
    {id: 4, title: 'Gamepad', price: 50, img: 'images/gamepad.jpg'},
];

const renderProduct = (product) => {
    return `<div class="product-item">
                <h3>${product.title}</h3>
                <img src="${product.img}">
                <p>${product.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
};
const renderPage = list => {
    const productsList = list.map(item => renderProduct(item)).join('');
    document.querySelector('.products').innerHTML = productsList;
};

renderPage(products);