// index.js
const express = require('express');
const app = express();

// Root route
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


app.use(express.json()); // Middleware to parse JSON request bodies

// In-memory "database"
let products = [
  {
    id: 1,
    name: "Laptop",
    description: "A powerful laptop for developers",
    price: 1200,
    category: "Electronics",
    inStock: true
  },
  {
    id: 2,
    name: "Headphones",
    description: "Noise-cancelling headphones",
    price: 200,
    category: "Accessories",
    inStock: false
  }
];

// ---------------- ROUTES ----------------

// GET /api/products - List all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// GET /api/products/:id - Get product by ID
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
});

// POST /api/products - Create new product
app.post('/api/products', (req, res) => {
  const { name, description, price, category, inStock } = req.body;

  const newProduct = {
    id: products.length ? products[products.length - 1].id + 1 : 1,
    name,
    description,
    price,
    category,
    inStock
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT /api/products/:id - Update product
app.put('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ message: "Product not found" });

  const { name, description, price, category, inStock } = req.body;

  product.name = name ?? product.name;
  product.description = description ?? product.description;
  product.price = price ?? product.price;
  product.category = category ?? product.category;
  product.inStock = inStock ?? product.inStock;

  res.json(product);
});

// DELETE /api/products/:id - Delete product
app.delete('/api/products/:id', (req, res) => {
  const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
  if (productIndex === -1) return res.status(404).json({ message: "Product not found" });

  const deletedProduct = products.splice(productIndex, 1);
  res.json(deletedProduct[0]);
});

// ---------------- MIDDLEWARE ----------------

// 1. Custom Logger Middleware
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
    next(); // pass control to the next middleware/route
});

// 2. JSON Body Parser Middleware
app.use(express.json());

// 3. Authentication Middleware (API Key check)
const authenticate = (req, res, next) => {
    const apiKey = req.headers['x-api-key']; // custom header
    const VALID_KEY = 'mysecretkey123'; // in real apps, store in env variable

    if (apiKey && apiKey === VALID_KEY) {
        next();
    } else {
        res.status(401).json({ message: 'Unauthorized: Invalid or missing API key' });
    }
};

// 4. Validation Middleware for Products
const validateProduct = (req, res, next) => {
    const { name, description, price, category, inStock } = req.body;

    if (typeof name !== 'string' || !name.trim()) {
        return res.status(400).json({ message: 'Product name is required and must be a string' });
    }
    if (typeof description !== 'string') {
        return res.status(400).json({ message: 'Description must be a string' });
    }
    if (typeof price !== 'number' || price < 0) {
        return res.status(400).json({ message: 'Price must be a positive number' });
    }
    if (typeof category !== 'string') {
        return res.status(400).json({ message: 'Category must be a string' });
    }
    if (typeof inStock !== 'boolean') {
        return res.status(400).json({ message: 'inStock must be a boolean' });
    }

    next(); // validation passed
};



// ---------------- ROUTES ----------------

// Apply authentication middleware to all /api routes
app.use('/api', authenticate);

// GET all products
app.get('/api/products', (req, res) => {
    res.json(products);
});

// GET product by ID
app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
});

// POST create product (with validation)
app.post('/api/products', validateProduct, (req, res) => {
    const { name, description, price, category, inStock } = req.body;
    const newProduct = {
        id: products.length ? products[products.length - 1].id + 1 : 1,
        name,
        description,
        price,
        category,
        inStock
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// PUT update product (with validation)
app.put('/api/products/:id', validateProduct, (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const { name, description, price, category, inStock } = req.body;
    product.name = name;
    product.description = description;
    product.price = price;
    product.category = category;
    product.inStock = inStock;

    res.json(product);
});

// DELETE product
app.delete('/api/products/:id', (req, res) => {
    const index = products.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: 'Product not found' });

    const deleted = products.splice(index, 1);
    res.json(deleted[0]);
});

const { NotFoundError, ValidationError } = require('./errors');
const errorHandler = require('./errorHandler');
const asyncWrapper = require('./asyncWrapper');


// Example: GET all products
app.get('/api/products', asyncWrapper(async (req, res) => {
    res.json(products);
}));

// Example: GET product by ID
app.get('/api/products/:id', asyncWrapper(async (req, res, next) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) throw new NotFoundError('Product not found');
    res.json(product);
}));

// Example: POST create product with validation
app.post('/api/products', asyncWrapper(async (req, res, next) => {
    const { name, description, price, category, inStock } = req.body;

    if (!name || typeof name !== 'string') {
        throw new ValidationError('Name is required and must be a string');
    }

    const newProduct = {
        id: products.length ? products[products.length - 1].id + 1 : 1,
        name,
        description,
        price,
        category,
        inStock,
    };

    products.push(newProduct);
    res.status(201).json(newProduct);
}));

// Catch-all for unknown routes
app.use((req, res, next) => {
    next(new NotFoundError(`Route ${req.originalUrl} not found`));
});

// Global error handler (last middleware)
app.use(errorHandler);

app.use(express.json());

// ---------------- ROUTES ----------------

// GET /api/products - with filtering + pagination
app.get('/api/products', asyncWrapper(async (req, res) => {
    let { category, page = 1, limit = 10 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    let filtered = products;

    // Filtering by category
    if (category) {
        filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginated = filtered.slice(startIndex, endIndex);

    res.json({
        total: filtered.length,
        page,
        limit,
        results: paginated
    });
}));

// GET /api/products/:id
app.get('/api/products/:id', asyncWrapper(async (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) throw new NotFoundError('Product not found');
    res.json(product);
}));

// SEARCH endpoint: GET /api/products/search?name=...
app.get('/api/products/search', asyncWrapper(async (req, res) => {
    const { name } = req.query;
    if (!name) return res.status(400).json({ message: "Query parameter 'name' is required" });

    const results = products.filter(p =>
        p.name.toLowerCase().includes(name.toLowerCase())
    );

    res.json({ count: results.length, results });
}));

// STATISTICS endpoint: GET /api/products/stats
app.get('/api/products/stats', asyncWrapper(async (req, res) => {
    const stats = products.reduce((acc, product) => {
        acc[product.category] = (acc[product.category] || 0) + 1;
        return acc;
    }, {});

    res.json({ total: products.length, byCategory: stats });
}));

// Catch-all for unknown routes
app.use((req, res, next) => {
    next(new NotFoundError(`Route ${req.originalUrl} not found`));
});

// Global error handler
app.use(errorHandler);
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
