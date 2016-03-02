var ScraperTree = require( './lib/ScraperTree' );

var context = {};

var mikelyons_head_node = new ScraperTree.PageNode( context, 'listing_page', [
    new ScraperTree.DomNode( context, '.column_post>div:first-child>a', [
        new ScraperTree.EvalNode( context, "this.attr( 'href' )", [
            new ScraperTree.Node( context, 'items:posts:url' ),
            new ScraperTree.PageNode( context, 'post_page', [
                new ScraperTree.DomNode( context, '#post_title', [
                    new ScraperTree.EvalNode( context, 'this.text()', [
                        new ScraperTree.Node( context, 'items:posts:title' )
                    ] )
                ] ),
                new ScraperTree.DomNode( context, '.two_thirds_width', [
                    new ScraperTree.EvalNode( context, 'this.html()', [
                        new ScraperTree.Node( context, 'items:posts:html_body' )
                    ] ),
                    new ScraperTree.EvalNode( context, 'this.text()', [
                        new ScraperTree.Node( context, 'items:posts:text_body' )
                    ] )
                ] )
            ] )
        ] )
    ] )
] );

var hackernews_head_node = new ScraperTree.PageNode( context, 'listing_page', [
    new ScraperTree.DomNode( context, '.athing', [
        new ScraperTree.DomNode( context, '.title>a', [
            new ScraperTree.EvalNode( context, 'this.text()', [
                new ScraperTree.Node( context, 'items:posts:title' )
            ] ),
            new ScraperTree.EvalNode( context, "this.attr( 'href' )", [
                new ScraperTree.Node( context, 'items:posts:url' )
            ] )
        ] )
    ] )
] );


hackernews_head_node
// .start( [], 'http://mikelyons.org/' )
    .start( [], 'https://news.ycombinator.com/' )
    .then( ( result ) => {
        console.log( JSON.stringify( result, null, 4 ) );
    } )
    .catch( ( err ) => {
        console.error( err );
        console.error( err.stack );
    } );
