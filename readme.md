# Express Products API

## 🚀 How to Run
1. Clone the repo
2. Install dependencies:
   ```bash
   npm install
3. Run the server:

    `node server.js`
   Server runs at http://localhost:3000

📌 API Endpoints
Products
GET /api/products → List all products (supports ?category=, ?page=, ?limit=)

GET /api/products/:id → Get product by ID

POST /api/products → Create new product

PUT /api/products/:id → Update product

DELETE /api/products/:id → Delete product

GET /api/products/search?name=... → Search products by name

GET /api/products/stats → Product statistics by category

🧪 Example Request

`curl -H "x-api-key: mysecretkey123" http://localhost:3000/api/products`

✅ Example Response

{
"total": 2,
"page": 1,
"limit": 10,
"results": [
{
"id": 1,
"name": "Laptop",
"description": "Dev laptop",
"price": 1200,
"category": "Electronics",
"inStock": true
}
]
}
