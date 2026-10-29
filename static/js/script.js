
let cart = [];

const cartCount = document.getElementById("cartCount");
const cartButton = document.getElementById("cartButton");

function updateCartCount() {
    cartCount.textContent = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );
}

document.querySelectorAll(".add-button").forEach((button) => {
    button.addEventListener("click", () => {
        const productId = Number(button.dataset.id);

        const existingItem = cart.find(
            (item) => item.id === productId
        );

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: productId,
                quantity: 1
            });
        }

        updateCartCount();

        button.textContent = "Added!";
        setTimeout(() => {
            button.textContent = "Add to cart";
        }, 1000);
    });
});

cartButton.addEventListener("click", async () => {
    if (cart.length === 0) {
        alert("Your cart is empty. Add a fragrance first.");
        return;
    }

    const response = await fetch("/api/products");
    const products = await response.json();

    const lines = cart.map((item) => {
        const product = products.find(
            (p) => p.id === item.id
        );

        return `${product.name} x ${item.quantity} — ₦${
            (product.price * item.quantity).toLocaleString("en-NG")
        }`;
    });

    const total = cart.reduce((sum, item) => {
        const product = products.find(
            (p) => p.id === item.id
        );

        return sum + product.price * item.quantity;
    }, 0);

    alert(
        "YOUR AURA SCENTS CART\n\n" +
        lines.join("\n") +
        "\n\nTotal: ₦" + total.toLocaleString("en-NG") +
        "\n\nContact the seller to arrange your order."
    );
});

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("customerName").value.trim();
    const message = document.getElementById("customerMessage").value.trim();
    const status = document.getElementById("contactStatus");

    status.textContent = "Sending...";

    try {
        const response = await fetch("/api/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, message })
        });

        const result = await response.json();

        status.textContent = result.message;

        if (response.ok) {
            contactForm.reset();
        }
    } catch (error) {
        status.textContent =
            "Could not send your message. Please try again.";
    }
});
