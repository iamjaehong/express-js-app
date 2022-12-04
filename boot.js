const mongoose = require('mongoose');
const { Post } = require('./models');

mongoose.connect('mongodb://localhost:27017/simple-board');

async function boot() {
  for (let i = 0; i < 100; i++) {
    await Post.create({
      airport: `게시글 ${i} 공항명`,
      area_apron: `게시글 ${i} 번 계류장면적`,
    });
  }
}

boot()
  .then(() => process.exit());
