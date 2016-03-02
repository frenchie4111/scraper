module.exports = {
    "thread_pages": {
        initial: [
            "https://tribot.org/forums/"
        ],
        scraper: {
            ".forum_name>strong>a": {
                "this.attr( 'href' )": 'lists:thread_pages'
            }
        }
    }
};
