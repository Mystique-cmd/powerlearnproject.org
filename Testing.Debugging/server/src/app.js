const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Post = require('./models/Post');
const User = require('./models/User');

const app = express();
app.use(express.json());

// Auth middleware
app.use((req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return next();
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, 'secret');
        req.user = decoded;
    } catch {
        return res.status(401).json({ error: 'Invalid token' });
    }
    next();
});

// Create post
app.post('/api/posts', async (req, res) => {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    const { title, content, category } = req.body;
    if (!title || !content || !category) return res.status(400).json({ error: 'Missing fields' });

    const post = await Post.create({
        title,
        content,
        category,
        author: req.user.id,
        slug: title.toLowerCase().replace(/\s+/g, '-'),
    });
    res.status(201).json(post);
});

// Get all posts
app.get('/api/posts', async (req, res) => {
    const { category, page = 1, limit = 10 } = req.query;
    const query = category ? { category } : {};
    const posts = await Post.find(query)
        .skip((page - 1) * limit)
        .limit(parseInt(limit));
    res.json(posts);
});

// Get post by ID
app.get('/api/posts/:id', async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
});

// Update post
app.put('/api/posts/:id', async (req, res) => {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    if (post.author.toString() !== req.user.id) return res.status(403).json({ error: 'Forbidden' });

    Object.assign(post, req.body);
    await post.save();
    res.json(post);
});

// Delete post
app.delete('/api/posts/:id', async (req, res) => {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    if (post.author.toString() !== req.user.id) return res.status(403).json({ error: 'Forbidden' });

    await post.deleteOne();
    res.json({ message: 'Deleted' });
});

module.exports = app;
