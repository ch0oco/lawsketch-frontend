# LawSketch — Full Stack Architecture Guide

## Stack
- **Frontend**: React (JSX artifact) 
- **Backend**: Node.js + Express
- **Database**: SQLite (via better-sqlite3)

## How to run the real backend

### 1. Install dependencies
```bash
mkdir lawsketch-backend && cd lawsketch-backend
npm init -y
npm install express better-sqlite3 cors
```

### 2. Create `server.js`
(See server.js content below)

### 3. Run
```bash
node server.js
# Server runs on http://localhost:3001
```

### 4. Connect frontend
In the React app, change `API_BASE` from `null` (localStorage mode) to `'http://localhost:3001'`

## SQL Schema
```sql
CREATE TABLE posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  excerpt TEXT,
  body TEXT,
  tags TEXT,         -- JSON array string
  read_time TEXT,
  published INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## API Endpoints
- GET    /api/posts          — list all posts (supports ?category=&tag=&q= filters)
- GET    /api/posts/:id      — single post
- POST   /api/posts          — create post (admin)
- PUT    /api/posts/:id      — update post (admin)
- DELETE /api/posts/:id      — delete post (admin)
- GET    /api/categories     — list categories with counts
- GET    /api/tags           — all unique tags

## Node.js server.js
```javascript
const express = require('express');
const Database = require('better-sqlite3');
const cors = require('cors');
const app = express();
const db = new Database('lawsketch.db');

app.use(cors());
app.use(express.json());

// Init schema
db.exec(`
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    excerpt TEXT,
    body TEXT,
    tags TEXT DEFAULT '[]',
    read_time TEXT DEFAULT '5 phút đọc',
    published INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// GET all posts
app.get('/api/posts', (req, res) => {
  const { category, tag, q } = req.query;
  let sql = 'SELECT * FROM posts WHERE published = 1';
  const params = [];
  if (category) { sql += ' AND category = ?'; params.push(category); }
  if (q) { sql += ' AND (title LIKE ? OR excerpt LIKE ?)'; params.push(`%${q}%`, `%${q}%`); }
  const posts = db.prepare(sql + ' ORDER BY created_at DESC').all(...params);
  const parsed = posts.map(p => ({ ...p, tags: JSON.parse(p.tags || '[]') }));
  if (tag) return res.json(parsed.filter(p => p.tags.includes(tag)));
  res.json(parsed);
});

// GET single post
app.get('/api/posts/:id', (req, res) => {
  const post = db.prepare('SELECT * FROM posts WHERE id = ?').get(req.params.id);
  if (!post) return res.status(404).json({ error: 'Not found' });
  res.json({ ...post, tags: JSON.parse(post.tags || '[]') });
});

// POST create
app.post('/api/posts', (req, res) => {
  const { title, category, excerpt, body, tags, read_time } = req.body;
  const result = db.prepare(
    'INSERT INTO posts (title, category, excerpt, body, tags, read_time) VALUES (?, ?, ?, ?, ?, ?)'
  ).run(title, category, excerpt, body, JSON.stringify(tags || []), read_time || '5 phút đọc');
  res.json({ id: result.lastInsertRowid });
});

// PUT update
app.put('/api/posts/:id', (req, res) => {
  const { title, category, excerpt, body, tags, read_time, published } = req.body;
  db.prepare(
    'UPDATE posts SET title=?, category=?, excerpt=?, body=?, tags=?, read_time=?, published=? WHERE id=?'
  ).run(title, category, excerpt, body, JSON.stringify(tags || []), read_time, published ?? 1, req.params.id);
  res.json({ success: true });
});

// DELETE
app.delete('/api/posts/:id', (req, res) => {
  db.prepare('DELETE FROM posts WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

// Categories
app.get('/api/categories', (req, res) => {
  const cats = db.prepare(
    "SELECT category, COUNT(*) as count FROM posts WHERE published=1 GROUP BY category"
  ).all();
  res.json(cats);
});

app.listen(3001, () => console.log('LawSketch API running on :3001'));
```
