'use strict';

var _ = require( 'underscore' );

var HashedQueue = require( './HashedQueue' ),
    Link = require( './Link' );

class LinkQueue extends HashedQueue {
    /**
     * Constructor for LinkQueue
     * @param  {Array|Object} initial_links See _addInitialLinks for formatting of this argument
     */
    constructor( initial_links ) {
        super();
        this._addInitialLinks( initial_links );
    }

    /**
     * Adds the initial links to the queue
     *
     * Array of links:
     * ```
     * [
     *     "http://google.com",
     *     "http://google.co.uk"
     * ]
     * ```
     *
     * Array of objects:
     * ```
     * [
     *     {
     *         link: 'http://google.com/',
     *         values: { // Allows specifying default values for the links
     *              title: 'homepage'
     *         }
     *     },
     *     //... more
     * ]
     * ```
     *
     * Object:
     * ```
     * {
     *     "http://google.com/": { // Easier way of specifying default values, no ordering kept
     *         title: 'homepage'
     *     },
     *     //... more
     * }
     * ```
     *
     * @param {Array|Object} initial_links Array or object see method description for possible inputs
     */
    _addInitialLinks( initial_links ) {
        if( _.isArray( initial_links ) ) { // Handle Array
            _
                .each( initial_links, ( initial_link ) => {
                    if( _.isString( initial_link ) ) { // Handle Array of Strings
                        this.push( new Link( initial_link, {} ) );
                    } else if( _.isObject( initial_link ) ) { // Handle Array of Objects
                        this.push( new Link( initial_link.link, initial_link.values ) );
                    }
                } );
        } else if( _.isObject( initial_links ) ) { // Handle Object
            _
                .each( initial_links, ( value, key ) => {
                    this.push( new Link( key, value ) )
                } );
        }
    }

    push( link ) {
        return super.push( link.link, link );
    }
};

module.exports = LinkQueue;
