var Node = require( './Node' );

class ListAddNode extends Node {
    _getListName() {
        var def_split = this.def.split( ':' );
        return def_split[ def_split - 1 ];
    }

    run( $ ) {
        context.addToList( _getListName(), $ );
    }
}

module.exports = ListAddNode;
