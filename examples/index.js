/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

var discreteUniform = require( '@stdlib/random-base-discrete-uniform' );
var shape2strides = require( '@stdlib/ndarray-base-shape2strides' );
var strides2offset = require( '@stdlib/ndarray-base-strides2offset' );
var randu = require( '@stdlib/random-base-randu' );
var maxViewBufferIndex = require( './../lib' );

var strides;
var offset;
var shape;
var idx;
var i;
var j;

shape = [ 0, 0, 0 ];

for ( i = 0; i < 100; i++ ) {
	// Generate a random array shape:
	shape[ 0 ] = discreteUniform( 1, 10 );
	shape[ 1 ] = discreteUniform( 1, 10 );
	shape[ 2 ] = discreteUniform( 1, 10 );

	// Generate strides:
	if ( randu() < 0.5 ) {
		strides = shape2strides( shape, 'row-major' );
	} else {
		strides = shape2strides( shape, 'column-major' );
	}
	j = discreteUniform( 0, shape.length-1 );
	strides[ j ] *= ( randu() < 0.5 ) ? -1 : 1;

	// Compute the index offset:
	offset = strides2offset( shape, strides );

	// Compute the maximum linear index:
	idx = maxViewBufferIndex( shape, strides, offset );
	console.log( 'Shape: %s. Strides: %s. Offset: %d. Max idx: %d.', shape.join( 'x' ), strides.join( ',' ), offset, idx );
}
