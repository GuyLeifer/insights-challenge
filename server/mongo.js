const Posts = new Schema({
    name: { type: String, default: 'hahaha' },
    age: { type: Number, min: 18, index: true },
    bio: { type: String, match: /[a-z]/ },
    date: { type: Date, default: Date.now },
    buff: Buffer
});

// a setter
Posts.path('name').set(function (v) {
    return capitalize(v);
});

// middleware
Posts.pre('save', function (next) {
    notify(this.get('email'));
    next();
});

export default Posts