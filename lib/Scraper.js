var _ = require( 'underscore' );

var List = require( './List' );

class Scraper {
    constructor( definition ) {
        this._initializeLists( definition );
    }

    _initializeLists( definition ) {
        this._def = definition;
        this.lists = {};
        this.items = {};

        _
            .each( definition, ( list_definition, list_name ) => {
                var queue = new LinkQueue( value );
                this.lists[ list_name ] = {
                    queue: queue,
                };
            } );
    }

    _getNotEmptyList() {
        return _.find( this.lists, ( list ) => !list.isEmpty() );
    }

    run() {
        return this.run();
    }
};

module.exports = Scraper;
