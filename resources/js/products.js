const API_URL = '/api/products';

const tableBody = document.querySelector('#products-table tbody');

let products = [];

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

    products.forEach((product) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${Number(product.price).toFixed(2)}</td>
        `;

        tableBody.appendChild(row);
    });
}

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
});
