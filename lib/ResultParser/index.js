var _ = require( 'underscore' );

Array.prototype.last = function() {
    return _.last( this );
};

var setAt = function( object, keypath, value ) {
    var obj = object;


    var all_but_last = keypath.slice( 0, -1 );
    _.each( all_but_last, function( key ) {
        if( !obj.hasOwnProperty( key ) ) obj[ key ] = {};
        obj = obj[ key ];
    } );

    var last_key = keypath.last();
    obj[ last_key ] = value;
    if( obj.hasOwnProperty( last_key ) ) {
        obj[ last_key ] = [ obj[ last_key ] ];
        obj[ last_key ].push( value );
    } else {
        obj[ last_key ] = value;
    }
};

var _createObject = function( result, full ) {
    full = full || {};

    if( result.keypath.last().startsWith( 'items' ) ) {
        setAt( full, result.keypath, result.results );
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
