module.exports = {
    "thread_pages": {
        initial: [
            "http://mikelyons.org",
            "http://mikelyons.org/posts.html"
        ],
        scraper: {
            ".column_post>div:first-child>a": {
                "this.attr( 'href' )": 'lists:posts'
            }
        }
    },
    "posts": {
        initial: [],
        scraper: {
            "#post_title": {
                "this.text()": 'items:posts:title'
            }
        }
    }
};
