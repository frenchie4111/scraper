var q = require( 'q' ),
    _ = require( 'underscore' );

var i = 0;

class Node {
    constructor( context, def, children_nodes ) {
        this.context = context;
        this.def = def;
        this.children_nodes = children_nodes;
    }

    /**
     * The run method to be implemented by child Node classes
     * Can either return a value, a promise or call the callback (multiple times is allowed) with results
     * @param  {Object}   $  Result value, passed to next item
     * @param  {Function} cb Called with the result value
     * @return {Object|Value|undefined} If a promise is returned it will wait for the promise to complete
     */
    run( $, cb ) {
        return $;
    }

    _result( keypath, results ) {
        if( !this.children_nodes ) {
            this.results = results;
            return results;
        };

        // Call children. // bfs
        var results_children_promises = _
            .map( this.children_nodes, ( child_node ) => {
                return child_node
                    .start( keypath, results );
            } );

        return results_children_promises;
    }

    start( keypath, $ ) {
        // Clone the keypath and add ourselves to it for the "recursion"
        keypath = keypath.slice( 0 );
        keypath.push( this.def );

        // Make a list of children running promises for this run
        var children = [];

        return q
            .try( () => {
                return this
                    .run( $, ( result ) => {
                        // if( !this.result ) this.result = [];
                        children = _.union( children, this._result( keypath, result ) );
                    } );
            } )
            .then( ( result ) => {
                // If no result was returned then he is probably using the cb
                if( !result ) return;

                // Run _result on whatever the results are (It passes it down the line)
                children = _.union( children, this._result( keypath, result ) );
            } )
            // Because we build the arrays of promises from a callback, we have
            // to store it externally then wait for it at the end
            .then( () => {
                return q.all( children );
            } )
            // Now we have to be a bit tricky. End nodes return single values
            .then( ( results ) => {
                if( !this.children_nodes ) results = this.results;
                return {
                    keypath: keypath,
                    results: results
                };
            } )
    }
}

module.exports = Node;
