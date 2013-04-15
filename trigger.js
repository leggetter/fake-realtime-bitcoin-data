var Pusher = require( 'pusher' );

var config = require( __dirname + '/config.json' );

var pusher = new Pusher( config.pusher );

pusher.trigger( 'test-channel', 'test-event', { 'message': 'hello world' } );