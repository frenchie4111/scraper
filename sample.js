module.exports = {
// This is how you start off with some links in your page, lists don't need to specified here (They will be created at whatever name you specify in the scraping section)
// Scraping will run until lists contain no more links
    "thread_lists": {
        "initial": [
            "https://tribot.org/forums/" // Whatever the initial links are, can be array or single String
        ],
        "scraper": {
            "[href=/https:\/\/forums\/post\/id=^&*/]": {
                // This would find all the forum links that match this pattern
                // You can nest another query. this refers to the found object
                // So here `this` is the a dom object, and this[href] is the link's value
                "this[href]": [
                    // This tells the scraper to add the link to the post_pages list
                    "lists:post_pages",
                    "lists:thread_lists", // Look for posts in those pages, AND for more thread links. You can add links to multiple lists
                    "items:post:thread",
                    "items:thread:url"
                ],
                "this[value]": "items:post:thread.name"
            }
        }
    },
    "post_pages": {
        "initial": [], // For posterity
        "scraper": {
            // These are jQuery esq queries that are run on the page once it is loaded.
            // Notice the regex being used when the value
            "a[href=/https:\/\/forums\/post\/id=^&*/]": {
                // This would find all the forum links that match this pattern
                // You can nest another query. this refers to the found object
                // So here `this` is the a dom object, and this[href] is the link's value
                "this[href]": [
                    // This tells the scraper to add the link to the post_pages list
                    "lists:post_pages",
                    "items:post:thread",
                    "items:thread:url"
                ],
                "this[value]": "items:post:thread.name"
            },
            "div.post": {
                "this[a.post_content]": {
                    "this[value]": "items:post:content"
                },
                "this[a.author_name]": {
                    "this[value]": "items:post:author"
                }
            },
            "a.page_number": {
                "this[value]": "items:post:thread.page_number"
            },
            "a.page_button": {
                "this[href]": "lists:post_pages"
            }
        }
    }
}
