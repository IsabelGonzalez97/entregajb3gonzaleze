// Definimos los productos utilizando JSON
const products = [
    {
        name: "Collar de Perlas",
        price: 50
    },
    {
        name: "Collar de Cuarzo Rosa",
        price: 35
    },
    {
        name: "Collar de Cristales Brillantes",
        price: 45
    }
];

// Función para generar dinámicamente los productos en el HTML
function generateProducts() {
    const productContainer = document.getElementById('product-container');

    products.forEach((product, index) => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');

        productDiv.innerHTML = `
            <img src="collar-de-crestales-brillantes${index + 1}.jpg" alt="${product.name}">
            <h2>${product.name}</h2>
            <p class="price">$${product.price}</p>
            <p>Elegante collar de perlas blancas, perfecto para ocasiones formales o para dar un toque de elegancia a cualquier conjunto.</p>
            <input type="number" class="quantity-input" value="1" min="1">
            <button class="buy-btn">Comprar</button>
        `;

        productContainer.appendChild(productDiv);
    });
}

// Función para mostrar el mensaje de confirmación
function showConfirmationMessage(quantity, productName, totalPrice) {
    const confirmationMessage = `Has comprado ${quantity} ${productName}(s) por $${totalPrice}. ¡Gracias por tu compra!`;
    const confirmationElement = document.getElementById('confirmation-message');
    confirmationElement.innerText = confirmationMessage;
    confirmationElement.style.display = 'block'; // Mostramos el mensaje cambiando el estilo display

    // Ocultamos el mensaje después de 3 segundos
    setTimeout(() => {
        confirmationElement.style.display = 'none';
    }, 3000);
}

// Función para manejar el clic en el botón de compra
function buyButtonClickHandler(event) {
    const button = event.target;
    const productDiv = button.closest('.product');
    const productName = productDiv.querySelector('h2').innerText;
    const productPrice = parseFloat(productDiv.querySelector('.price').innerText.replace('$', ''));
    const quantity = parseInt(productDiv.querySelector('.quantity-input').value);

    if (quantity > 0) {
        const totalPrice = productPrice * quantity;
        showConfirmationMessage(quantity, productName, totalPrice); // Mostramos el mensaje de confirmación
        localStorage.setItem(productName, quantity);
    } else {
        alert("Por favor, ingresa una cantidad válida.");
    }
}

// Generamos los productos dinámicamente al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    generateProducts();
    const buyButtons = document.querySelectorAll('.buy-btn');
    buyButtons.forEach(button => {
        button.addEventListener('click', buyButtonClickHandler);
    });
});
