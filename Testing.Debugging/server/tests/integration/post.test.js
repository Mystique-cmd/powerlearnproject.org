const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const jwt = require('jsonwebtoken');

const app = require('../../src/app'); // adjust path to your Express app
const Post = require('../../src/models/Post');
const User = require('../../src/models/User');

let mongoServer;
let token;
let userId;
let postId;

beforeAll(async () => {
    // Start in-memory MongoDB
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    await mongoose.connect(uri);

    // Create a test user
    const user = new User({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
    });
    await user.save();
    userId = user._id;

    // Instead of hitting /api/auth/login, directly sign a JWT
    token = jwt.sign({ id: userId }, process.env.JWT_SECRET || 'secret', {
        expiresIn: '1h',
    });
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

afterEach(async () => {
    await Post.deleteMany({});
});

describe('POST /api/posts', () => {
    it('should create a new post when authenticated', async () => {
        const res = await request(app)
            .post('/api/posts')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Test Post',
                content: 'This is a test post content',
                author: userId,
                category: new mongoose.Types.ObjectId(),
                slug: 'test-post',
            });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('_id');
        postId = res.body._id;
    });

    it('should return 401 if not authenticated', async () => {
        const res = await request(app)
            .post('/api/posts')
            .send({ title: 'Unauthorized Post' });

        expect(res.statusCode).toBe(401);
    });
});

describe('GET /api/posts', () => {
    it('should return all posts', async () => {
        const res = await request(app).get('/api/posts');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('should return a post by ID', async () => {
        // Ensure a post exists
        const post = new Post({
            title: 'Temp Post',
            content: 'Content',
            author: userId,
            category: new mongoose.Types.ObjectId(),
            slug: 'temp-post',
        });
        await post.save();
        postId = post._id;

        const res = await request(app).get(`/api/posts/${postId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('_id', postId.toString());
    });
});

describe('PUT /api/posts/:id', () => {
    it('should update a post when authenticated as author', async () => {
        const post = new Post({
            title: 'Old Title',
            content: 'Content',
            author: userId,
            category: new mongoose.Types.ObjectId(),
            slug: 'old-title',
        });
        await post.save();
        postId = post._id;

        const res = await request(app)
            .put(`/api/posts/${postId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'Updated Title' });

        expect(res.statusCode).toBe(200);
        expect(res.body.title).toBe('Updated Title');
    });
});

describe('DELETE /api/posts/:id', () => {
    it('should delete a post when authenticated as author', async () => {
        const post = new Post({
            title: 'Delete Me',
            content: 'Content',
            author: userId,
            category: new mongoose.Types.ObjectId(),
            slug: 'delete-me',
        });
        await post.save();
        postId = post._id;

        const res = await request(app)
            .delete(`/api/posts/${postId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
    });
});
