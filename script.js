// app.js
const productsData = {
    tacos: [
        { name: "Taco al Pastor", price: "$18", img: "taco1.jpg" },
        { name: "Taco de Carnitas", price: "$20", img: "taco2.jpg" },
        { name: "Taco de Barbacoa", price: "$24", img: "taco3.jpg" },
        { name: "Taco de Pollo", price: "$30", img: "taco4.jpg" },
        { name: "Taco Vegetariano", price: "$15", img: "taco5.jpg" }
    ],
    hamburguesas: [
        { name: "Hamburguesa Clásica", price: "$79", img: "hamburguesa1.jpg" },
        { name: "Hamburguesa con Queso", price: "$85", img: "hamburguesa2.jpg" },
        { name: "Hamburguesa BBQ", price: "$88", img: "hamburguesa3.jpg" },
        { name: "Hamburguesa de Pollo", price: "$69", img: "hamburguesa4.jpg" },
        { name: "Hamburguesa Vegetariana", price: "$70", img: "hamburguesa5.jpg" }
    ],
    pizzas: [
        { name: "Pizza Margarita", price: "$100", img: "pizza1.jpg" },
        { name: "Pizza Pepperoni", price: "$120", img: "pizza2.jpg" },
        { name: "Pizza Hawaiana", price: "$110", img: "pizza3.jpg" },
        { name: "Pizza Suprema", price: "$140", img: "pizza4.jpg" },
        { name: "Pizza Vegetariana", price: "$120", img: "pizza5.jpg" }
    ],
    postres: [
        { name: "Pastel de Chocolate", price: "$50", img: "postre1.jpg" },
        { name: "Helado de Vainilla", price: "$40", img: "postre2.jpg" },
        { name: "Flan de Caramelo", price: "$30", img: "postre3.jpg" },
        { name: "Cheesecake", price: "$50", img: "postre4.jpg" },
        { name: "Brownie", price: "$40", img: "postre5.jpg" }
    ],
    bebidas: [
        { name: "Coca-Cola", price: "$20", img: "bebida1.jpg" },
        { name: "Agua Mineral", price: "$15", img: "bebida2.jpg" },
        { name: "Jugo Natural", price: "$30", img: "bebida3.jpg" },
        { name: "Café Americano", price: "$25", img: "bebida4.jpg" },
        { name: "Té Helado", price: "$20", img: "bebida5.jpg" }
    ],
    "pollo-frito": [
        { name: "Pieza de Pollo", price: "$30", img: "pollo1.jpg" },
        { name: "Combo de 2 Piezas", price: "$50", img: "pollo2.jpg" },
        { name: "Alitas de Pollo", price: "$60", img: "pollo3.jpg" },
        { name: "Tiras de Pollo", price: "$40", img: "pollo4.jpg" },
        { name: "Combo Familiar", price: "$150", img: "pollo5.jpg" }
    ]
};

const cart = [];

// Display products
document.getElementById("categories").addEventListener("click", (e) => {
    const category = e.target.dataset.category;
    if (category) {
        displayProducts(category);
    }
});

function displayProducts(category) {
    const productsSection = document.getElementById("products");
    productsSection.innerHTML = "";
    productsData[category].forEach((product) => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");
        productCard.innerHTML = `
            <img src="images/${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Precio: ${product.price}</p>
            <button>Añadir al Carrito</button>
        `;
        productCard.querySelector("button").addEventListener("click", () => {
            addToCart(product);
        });
        productsSection.appendChild(productCard);
    });
}

function addToCart(product) {
    cart.push(product);
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";
    let total = 0;
    cart.forEach((item, index) => {
        total += parseFloat(item.price.substring(1));
        const li = document.createElement("li");
        li.textContent = `${item.name} - ${item.price}`;
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "X";
        removeBtn.addEventListener("click", () => {
            cart.splice(index, 1);
            updateCart();
        });
        li.appendChild(removeBtn);
        cartItems.appendChild(li);
    });
    document.getElementById("cart-total").textContent = `Total: $${total.toFixed(2)}`;
}

// Variables de autenticación
let currentUser = null;

// Función para mostrar el modal de autenticación
function toggleAuthModal() {
    const authModal = document.getElementById("auth-modal");
    authModal.classList.toggle("show");
}

// Mostrar el nombre del usuario autenticado
function updateUserSection() {
    const userInfo = document.getElementById("user-info");
    const authButton = document.getElementById("auth-button");

    if (currentUser) {
        userInfo.textContent = `Hola, ${currentUser}`;
        authButton.textContent = "Cerrar Sesión";
    } else {
        userInfo.textContent = "";
        authButton.textContent = "Login";
    }
}

// Registro de usuario
function registerUser(username, password) {
    const users = JSON.parse(localStorage.getItem("users")) || {};
    if (users[username]) {
        alert("El usuario ya existe. Por favor, elige otro nombre de usuario.");
        return false;
    }
    users[username] = password;
    localStorage.setItem("users", JSON.stringify(users));
    alert("Usuario registrado con éxito. Por favor, inicia sesión.");
    return true;
}

// Inicio de sesión
function loginUser(username, password) {
    const users = JSON.parse(localStorage.getItem("users")) || {};
    if (users[username] && users[username] === password) {
        currentUser = username;
        alert("Inicio de sesión exitoso.");
        updateUserSection();
        toggleAuthModal();
        return true;
    }
    alert("Usuario o contraseña incorrectos.");
    return false;
}

// Cerrar sesión
function logoutUser() {
    currentUser = null;
    updateUserSection();
    alert("Has cerrado sesión.");
}

// Eventos del formulario de autenticación
document.getElementById("auth-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const isRegister = document.getElementById("auth-title").textContent === "Registro";
    if (isRegister) {
        if (registerUser(username, password)) {
            document.getElementById("auth-title").textContent = "Login";
            document.getElementById("toggle-auth").textContent = "¿No tienes cuenta? Regístrate";
        }
    } else {
        loginUser(username, password);
    }
});

// Alternar entre registro e inicio de sesión
document.getElementById("toggle-auth").addEventListener("click", () => {
    const authTitle = document.getElementById("auth-title");
    const toggleAuthText = document.getElementById("toggle-auth");

    if (authTitle.textContent === "Login") {
        authTitle.textContent = "Registro";
        toggleAuthText.textContent = "¿Ya tienes cuenta? Inicia sesión";
    } else {
        authTitle.textContent = "Login";
        toggleAuthText.textContent = "¿No tienes cuenta? Regístrate";
    }
});

// Botón de login/logout
document.getElementById("auth-button").addEventListener("click", () => {
    if (currentUser) {
        logoutUser();
    } else {
        toggleAuthModal();
    }
});

// Mostrar el modal de pago
function togglePaymentModal() {
    const paymentModal = document.getElementById("payment-modal");
    paymentModal.classList.toggle("show");
}

// Validar los campos del formulario de pago
function validatePaymentForm(data) {
    const cardNumberRegex = /^\d{16}$/; // 16 dígitos
    const expiryDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/; // MM/AA
    const cvvRegex = /^\d{3}$/; // 3 dígitos

    if (!data.cardName.trim()) {
        alert("El nombre en la tarjeta es obligatorio.");
        return false;
    }

    if (!cardNumberRegex.test(data.cardNumber)) {
        alert("El número de tarjeta debe tener 16 dígitos.");
        return false;
    }

    if (!expiryDateRegex.test(data.expiryDate)) {
        alert("La fecha de vencimiento debe tener el formato MM/AA.");
        return false;
    }

    if (!cvvRegex.test(data.cvv)) {
        alert("El CVV debe tener 3 dígitos.");
        return false;
    }

    return true;
}

// Simulación del pago
document.getElementById("payment-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const cardName = document.getElementById("card-name").value;
    const cardNumber = document.getElementById("card-number").value;
    const expiryDate = document.getElementById("expiry-date").value;
    const cvv = document.getElementById("cvv").value;

    const paymentData = { cardName, cardNumber, expiryDate, cvv };

    if (validatePaymentForm(paymentData)) {
        alert("Pago exitoso. Gracias por tu compra.");
        togglePaymentModal();
        clearCart(); // Vaciar carrito tras el pago
    }
});

// Vaciar el carrito después del pago
function clearCart() {
    cart.length = 0; // Vaciar array del carrito
    updateCart();
}

// Botón para abrir el modal de pago
document.getElementById("checkout-button").addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Tu carrito está vacío. Agrega productos antes de pagar.");
    } else {
        togglePaymentModal();
    }
});