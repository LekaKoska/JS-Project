const API_URL = 'http://localhost/api/products';

const tableBody = document.querySelector('#products-table tbody');
const form = document.querySelector('#product-form');
const name = document.getElementById('product-name');
const price = document.getElementById('product-price');
let products = [];

let editTemplate = document.querySelector('.edit-template');
const editForm = document.querySelector('#product-edit-form');
const editName = document.getElementById('product-name-edit');
const editPrice = document.getElementById('product-price-edit');
const productId = document.getElementById('product-id')
const cancelEditBtn = document.getElementById('cancel-edit');



const message = document.querySelector('.message p');

async function fetchProducts() {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
    }

    const result = await response.json();

    return result.data;
}

function updateTable() {
    tableBody.innerHTML = '';

    products.forEach(product => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${Number(product.price).toFixed(2)}</td>
            <td><button class="edit-btn btn btn-primary">Edit</button></td>
            <td><button class="delete-btn btn btn-danger">Delete</button></td>
        `;

        row.querySelector('.edit-btn')
            .addEventListener('click', () => {
                updateProduct(product.id, product.name, product.price);
            });

        row.querySelector('.delete-btn')
            .addEventListener('click', () => {
                deleteProduct(product.id);
            });

        tableBody.appendChild(row);
    });
}
async function createProduct() {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name.value.trim(),
            price: price.value,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message);
    }
    return data.data;
}
function updateProduct(id, name, price)
{
    form.style.display = "none";
    editTemplate.style.display = 'block';

    productId.value = id;
    editName.value = name;
    editPrice.value = price;

}

async function deleteProduct(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`Delete failed: ${response.status}`);
    }

    const data = await response.json();

    message.textContent = data.message;

    products = products.filter(p => p.id !== id);
    updateTable();
}

// Glavni eventi za CREATE i EDIT



//CREATE
form.addEventListener('submit', async (event) =>
{
    event.preventDefault();
    try
    {
        const created = await createProduct();
        products.push(created);
        updateTable();
    } catch (error)
    {
        console.error(error);
    }

    event.target.reset();
});

// CANCEL UPDATE
cancelEditBtn.addEventListener("click", () =>
{
    editTemplate.style.display = 'none';
    form.style.display = 'flex';
    editForm.reset();
});

// UPDATE
editForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    try {
        const id = productId.value;

        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: editName.value.trim(),
                price: editPrice.value,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        const product = products.find(p => p.id == id);
        product.name = editName.value.trim();
        product.price = editPrice.value;


        updateTable();
        editForm.reset();
        message.textContent = 'Product updated successfully';

    } catch (error) {
        console.error(error);
        message.textContent = error.message;
    }
});
async function loadProducts() {
    try {
        products = await fetchProducts();
        updateTable();
    } catch (error) {
        console.error(error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    editTemplate.style.display = 'none';
});
