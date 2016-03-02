var Node = require( './Node' );

class EvalNode extends Node {
    run( $ ) {
        var query = this.def;

        return ( function() {
            return eval( query );
        } ).bind( $ )();
    }
}

module.exports = EvalNode;
