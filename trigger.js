var Pusher = require( 'pusher' );
var argv = require( 'optimist' )
    .default( 'interval', 10 )
    .default( 'count', 6 )
    .argv

var config = require( __dirname + '/config.json' );
var pusher = new Pusher( config.pusher );

var baseData = {
  "last": 61.157,
  "low": 51,
  "high": 95.713
  //"volume": "66271 BTC / 4734629 USD"
};

var volBtc = 66271;
var volUsd = 4734629;

  // "last": "61.157 USD",
  // "low": "51 USD",
  // "high": "95.713 USD",
  // "volume": "66271 BTC / 4734629 USD"

function getRandomData() {
	var direction,
			change,
			newValue,
			newValueStr,
			dpMatch,
			newData = {};
	for( var x in baseData ) {
		direction = Math.floor( getRandomNumber( -1, 1 ) );
		change = ( getRandomNumber( 0, 5 ) * direction );
		newValue = ( baseData[ x ] + change );
		newValueStr = ( '' + newValue );
		dpMatch = ( newValueStr.replace( /\d+\./, '' ).match( /(?!\.)\d/g )||[] );

		if( dpMatch.length > 3 ) {
			newValue = newValue.toFixed( 3 );
		}
		newData[ x ] = newValue + ' USD';
	}

	var volDirection = Math.floor( getRandomNumber( -1, 1 ) );
	var volChange = Math.round( getRandomNumber( 0, 100 ) * volDirection );
	var newVolBtc = ( volBtc + volChange );
	var newVolUsd = ( volUsd + volChange );

	newData['volume'] = newVolBtc + ' BTC / ' + newVolUsd + ' USD';
	return newData;
}

function getRandomNumber( min, max ) {
	return ( Math.random() * (max - min) ) + min;
}

var count = 0;
var interval = setInterval( function() {
	console.log( 'triggering: ' + (count + 1 ) )
	var data = getRandomData();
	pusher.trigger( 'btc-usd-demo', 'new-price', data );
	++count;
	if( count == argv.count ) {
		console.log( 'triggering complete' );
		clearInterval( interval );
	}
}, ( argv.interval * 1000 ) );