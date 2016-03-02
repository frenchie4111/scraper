var _ = require( 'underscore' );

var Node = require( './Node' );

var cheerio = require( 'cheerio' );

class DomNode extends Node {
    run( $, cb ) {
        var found = null;
        if( _.isFunction( $ ) ) {
            var found = $( this.def );
            _.each( found, ( val ) => {
                cb( $( val ) )
            } );
        } else {
            var found = $.find( this.def );
            // console.log( found.toArray()[ 0 ] );
            var _this = this;
            found.each( function( i, val ) {

                var blah = function( name, val ) {
                    console.log( name, val, _.isFunction( val ), _.functions( val ) );
                }

                cb( cheerio( this ) );
            } );
        }

    }
}

module.exports = DomNode;
