class HashedQueue {
    constructor() {
        this.queue = [];
        this.items = {};
    }

    push( key, value ) {
        if( this.items.hasOwnProperty( key ) ) return false;

        this.items[ key ] = value;
        this.queue.push( key );
    };

    pop() {
        return this.items[ this.queue.pop() ];
    };
};

module.exports = HashedQueue;
