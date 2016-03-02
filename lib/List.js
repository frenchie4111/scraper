var EventEmitter = require( 'events' ).EventEmitter;

var q = require( 'q' ),
    _ = require( 'underscore' ),
    request = require( 'request' ),
    cheerio = require( 'cheerio' );

var LinkQueue = require( './LinkQueue' ),
    Link = require( './Link' );

class List extends EventEmitter {
    constructor( def ) {
        super();

        this._def = def;
        this._initLinkQueue( def.initial );
        this.scraper = def.scraper;
    }

    _initLinkQueue( initial_values ) {
        this.link_queue = new LinkQueue( initial_values );
    }

    isEmpty() {
        return this.link_queue.isEmpty();
    }

    _request( url ) {
        return q
            .Promise( function( resolve, reject ) {
                request( {
                    url: url,
                    method: 'get'
                }, function( err, res, body ) {
                    if( err ) return reject( err );
                    resolve( cheerio.load( body ) );
                } );
            } );
    }

    _query( $, query ) {
        if( query.startsWith( 'this.' ) ) {
            return ( function() {
                return eval( query );
            } ).bind( $ )();
        } else {
            var results = $( query );
            return results;
        }
    }

    _handleStringResultHandler( result_handler, result, link ) {
        var result_handler_split = result_handler.split( ':' );

        if( result_handler.startsWith( 'lists:' ) ) {
            var list_name = result_handler.replace( 'lists:', '' );
            result = 'http://mikelyons.org' + result;
            this.emit( 'list', { name: list_name, link: new Link( result, { parent: link } ) } );
        } else if( result_handler_split[ 0 ] === 'items' ) {
            this.emit( 'item', { category: result_handler_split[ 1 ], key: result_handler_split[ 2 ], link: link, value: result } );
        }
    }

    _runResultsHandler( $, result, result_handler, link ) {
        if( _.isObject( result_handler ) ) {
            this._runQueries( $( result ), result_handler, link );
        } else if( _.isString( result_handler ) ) {
            this._handleStringResultHandler( result_handler, result, link );
        }
    }

    _runQueries( $, queries, link ) {
        _
            .each( queries, ( result_handler, query ) => {
                var results = this._query( $, query );

                if( _.isObject( results ) ) {
                    _
                        .each( results, ( result ) => {
                            this._runResultsHandler( $, result, result_handler, link );
                        } );
                } else {
                    this._runResultsHandler( $, results, result_handler, link );
                }
            } )
    }

    run() {
        var link = this.link_queue.pop();

        return this
            ._request( link.link )
            .then( ( $ ) => {
                this._runQueries( $, this.scraper, link );
            } )
            .catch( function( err ) {
                console.error( err );
                console.error( err.stack );
            } );
    }
};

module.exports = List;
