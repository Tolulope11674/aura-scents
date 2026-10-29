
from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

PRODUCTS = [
    {
        "id": 1,
        "name": "Vanilla Glow",
        "category": "Sweet",
        "size": "6ml",
        "price": 700,
        "description": "A warm, sweet fragrance for everyday wear.",
        "image": "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=600&q=80"
    },
    {
        "id": 2,
        "name": "Fresh Aura",
        "category": "Fresh",
        "size": "6ml",
        "price": 700,
        "description": "A fresh, clean scent for daily confidence.",
        "image": "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=80"
    },
    {
        "id": 3,
        "name": "Midnight Musk",
        "category": "Woody",
        "size": "10ml",
        "price": 1300,
        "description": "A rich, warm fragrance for evening occasions.",
        "image": "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80"
    },
    {
        "id": 4,
        "name": "Floral Bliss",
        "category": "Floral",
        "size": "3ml",
        "price": 350,
        "description": "A soft floral scent in a pocket-friendly size.",
        "image": "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=600&q=80"
    }
]


@app.route("/")
def home():
    return render_template("index.html", products=PRODUCTS)


@app.route("/api/products")
def get_products():
    return jsonify(PRODUCTS)


@app.route("/api/contact", methods=["POST"])
def contact():
    data = request.get_json(silent=True) or {}

    name = str(data.get("name", "")).strip()
    message = str(data.get("message", "")).strip()

    if not name or not message:
        return jsonify({
            "success": False,
            "message": "Please enter your name and message."
        }), 400

    # For now, return a response.
    # Later, we can connect this to WhatsApp or a database.
    return jsonify({
        "success": True,
        "message": "Thank you! Your message has been received."
    })


if __name__ == "__main__":
    app.run(debug=True)
