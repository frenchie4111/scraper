var Scraper = require( './lib/Scraper' );

var scraper = new Scraper( require( './sample' ) );

console.log( JSON.stringify( scraper, null, 4 ) );

console.log( '---- \nRunning\n----' );

scraper.run();
