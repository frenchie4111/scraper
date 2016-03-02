var q = require( 'q' ),
    request = require( 'request' ),
    cheerio = require( 'cheerio' );

var Node = require( './Node' ) ;

class PageNode extends Node {
    _request( url ) {
        if( url.startsWith( '/' ) ) url = 'http://mikelyons.org'+ url;

        return q
            .Promise( ( resolve, reject ) => {
                request( {
                    url: url,
                    method: 'get'
                }, ( err, res, body ) => {
                    if( err ) return reject( err );
                    var $ = cheerio.load( body );
                    this.context.$ = $;
                    resolve( $ );
                } );
            } );
    }

    run( $ ) {
        return this
            ._request( $ );
    }
}

module.exports = PageNode;
