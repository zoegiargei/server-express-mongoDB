const btnPrevPag = document.getElementById('prevPage');
const btnNextPag = document.getElementById('nextPage');
const divPageNumber = document.getElementById('pageNumber');
const divProducts = document.getElementById('divProducts');

const constURL = "localhost:8080/web/products/";

const changePage = (value) => {
    const newUrl = `${constURL}?page=${value}`
    getProducts(newUrl)
};

const getProducts = (newUrl) => {
    fetch(newUrl)
    .then(res => res.json())
    .then(resJson => {
        console.log(resJson)
        showProducts(resJson)
    })
};

const showProducts = (arrayProducts) => {
    
    const template = arrayProducts.forEach(prod => {
        `
            <ul class="list-group">
                <li class="list-group-item list-group-item-action active" aria-current="true" ><h5>Product: ${prod.title}</h5></li>
                <li class="list-group-item list-group-item-action" >Description: ${prod.description}</li>
                <li class="list-group-item list-group-item-action" >Code: ${prod.code}</li>
                <li class="list-group-item list-group-item-action" >Price: ${prod.price}</li>
                <li class="list-group-item list-group-item-action" >Status: ${prod.status}</li>
                <li class="list-group-item list-group-item-action" >Stock: ${prod.stock}</li>
                <li class="list-group-item list-group-item-action" >Category: ${prod.category}</li>
                <li class="list-group-item list-group-item-action" >Thumbnail: ${prod.thumbnail}</li>
            </ul>
        `    
    })

    divProducts.innerHTML += template
};

btnPrevPag.addEventListener('click', () => {
    changePage(btnPrevPag.value)
});

btnNextPag.addEventListener('click', () => {
    changePage(btnNextPag.value)
});