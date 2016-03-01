var EventEmitter = require( 'events' ).EventEmitter;

var LinkQueue = require( './LinkQueue' );

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

    run() {
        var link = this.link_queue.pop();
        this.emit( 'item', { key: 'item:name', value: 'asdf' } );
    }
};

module.exports = List;
