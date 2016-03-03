var _ = require( 'underscore' );

Array.prototype.last = function() {
    return _.last( this );
};

var setAt = function( object, keypath, value ) {
    var obj = this;

    console.log( 'setting', keypath )

    _.each( keypath.slice( -1 ), function( key ) {
        if( !obj.hasOwnProperty( key ) ) obj[ key ] = {};
        obj = obj[ key ];
    } );

    var last_key = keypath.last();
    if( obj.hasOwnProperty( last_key ) ) {
        obj[ last_key ] = [ obj[ last_key ] ];
        obj[ last_key ].push( value );
    } else {
        obj[ last_key ] = value;
    }
};

var _createObject = function( result, full ) {
    full = full || {};

    console.log( JSON.stringify( result, null, 4 ) );

    if( result.keypath.last().startsWith( 'items' ) ) {
        setAt( full, result.keypath, result.result );
    } else {
        _
            .each( result.results, ( child_result ) => {
                _createObject( child_result, full );
            } )
    }

    return full;
};

exports.parse = function( results ) {
    var object = _createObject( results );
    return object;
}
