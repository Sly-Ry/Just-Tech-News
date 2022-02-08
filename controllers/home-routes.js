// This file will contain all of the user-facing routes, such as the homepage and login page.
const router = require('express').Router();

router.get('/', (req, res) => {
    // We're going to take a single "post" object and pass it to the homepage.handlebars template. Each property on the object (id, post_url, title, etc.) becomes available in the template using the Handlebars.js {{ }} syntax.
    res.render('homepage', {
        id: 1,
        post_url: 'https://handlebarsjs.com/guide/',
        title: 'Handlebars Docs',
        created_at: new Date(),
        vote_count: 10,
        comments: [{}, {}],
        user: {
            username: 'test_user'
        }
    });
});
module.exports = router;