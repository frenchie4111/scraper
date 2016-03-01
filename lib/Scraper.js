var _ = require( 'underscore' );

var List = require( './List' );

class Scraper {
    constructor( definition ) {
        this._initializeLists( definition );
    }

    _initializeLists( definition ) {
        this._def = definition;
        this.lists = {};

        _
            .each( definition, ( value, key ) => {
                var list = new List( value );

                list.on( 'item', this._onListEmitItem );
                list.on( 'list', this._onListEmitList );

                this.lists[ key ] = list;
            } );
    }

    _onListEmitItem( value ) {
        console.log( '_onListEmitItem()', value );
    }

    _onListEmitList( value ) {
        console.log( '_onListEmitList()', value );
    }

    _getNotEmptyList() {
        return _.find( this.lists, ( list ) => !list.isEmpty() );
    }

    run() {
        var non_empty_list = null;
        while( non_empty_list = this._getNotEmptyList() ) {
            non_empty_list.run();
        }
    }
};

module.exports = Scraper;
