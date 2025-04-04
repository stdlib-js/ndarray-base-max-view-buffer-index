<!--

@license Apache-2.0

Copyright (c) 2018 The Stdlib Authors.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

-->


<details>
  <summary>
    About stdlib...
  </summary>
  <p>We believe in a future in which the web is a preferred environment for numerical computation. To help realize this future, we've built stdlib. stdlib is a standard library, with an emphasis on numerical and scientific computation, written in JavaScript (and C) for execution in browsers and in Node.js.</p>
  <p>The library is fully decomposable, being architected in such a way that you can swap out and mix and match APIs and functionality to cater to your exact preferences and use cases.</p>
  <p>When you use stdlib, you can be absolutely certain that you are using the most thorough, rigorous, well-written, studied, documented, tested, measured, and high-quality code out there.</p>
  <p>To join us in bringing numerical computing to the web, get started by checking us out on <a href="https://github.com/stdlib-js/stdlib">GitHub</a>, and please consider <a href="https://opencollective.com/stdlib">financially supporting stdlib</a>. We greatly appreciate your continued support!</p>
</details>

# maxViewBufferIndex

[![NPM version][npm-image]][npm-url] [![Build Status][test-image]][test-url] [![Coverage Status][coverage-image]][coverage-url] <!-- [![dependencies][dependencies-image]][dependencies-url] -->

> Compute the maximum linear index in an underlying data buffer accessible to an array view.

<!-- Section to include introductory text. Make sure to keep an empty line after the intro `section` element and another before the `/section` close. -->

<section class="intro">

</section>

<!-- /.intro -->

<!-- Package usage documentation. -->

<section class="installation">

## Installation

```bash
npm install @stdlib/ndarray-base-max-view-buffer-index
```

Alternatively,

-   To load the package in a website via a `script` tag without installation and bundlers, use the [ES Module][es-module] available on the [`esm`][esm-url] branch (see [README][esm-readme]).
-   If you are using Deno, visit the [`deno`][deno-url] branch (see [README][deno-readme] for usage intructions).
-   For use in Observable, or in browser/node environments, use the [Universal Module Definition (UMD)][umd] build available on the [`umd`][umd-url] branch (see [README][umd-readme]).

The [branches.md][branches-url] file summarizes the available branches and displays a diagram illustrating their relationships.

To view installation and usage instructions specific to each branch build, be sure to explicitly navigate to the respective README files on each branch, as linked to above.

</section>

<section class="usage">

## Usage

```javascript
var maxViewBufferIndex = require( '@stdlib/ndarray-base-max-view-buffer-index' );
```

#### maxViewBufferIndex( shape, strides, offset )

Computes the maximum linear index in an underlying data buffer accessible to an array view.

```javascript
// Array shape:
var shape = [ 2, 2 ];

// Stride array:
var strides = [ 2, 1 ];

// Index offset which specifies the location of the first indexed value:
var offset = 0;

var idx = maxViewBufferIndex( shape, strides, offset );
// returns 3
```

</section>

<!-- /.usage -->

<!-- Package usage notes. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="notes">

</section>

<!-- /.notes -->

<!-- Package usage examples. -->

<section class="examples">

## Examples

<!-- eslint no-undef: "error" -->

```javascript
var discreteUniform = require( '@stdlib/random-base-discrete-uniform' );
var shape2strides = require( '@stdlib/ndarray-base-shape2strides' );
var strides2offset = require( '@stdlib/ndarray-base-strides2offset' );
var randu = require( '@stdlib/random-base-randu' );
var maxViewBufferIndex = require( '@stdlib/ndarray-base-max-view-buffer-index' );

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
```

</section>

<!-- /.examples -->

<!-- C interface documentation. -->

* * *

<section class="c">

## C APIs

<!-- Section to include introductory text. Make sure to keep an empty line after the intro `section` element and another before the `/section` close. -->

<section class="intro">

</section>

<!-- /.intro -->

<!-- C usage documentation. -->

<section class="usage">

### Usage

```c
#include "stdlib/ndarray/base/max_view_buffer_index.h"
```

#### stdlib_ndarray_max_view_buffer_index( ndims, \*shape, \*strides, offset )

Computes the maximum linear index (in bytes) in an underlying data buffer accessible to an array view.

```c
#include <stdint.h>

int64_t ndims = 2;
int64_t shape[] = { 10, 10 };
int64_t strides[] = { 10, 1 };
int64_t offset = 0;

int64_t idx = stdlib_ndarray_max_view_buffer_index( ndims, shape, strides, offset );
// returns 99
```

The function accepts the following arguments:

-   **ndims**: `[in] int64_t` number of dimensions.
-   **shape**: `[in] int64_t*` array shape (dimensions).
-   **strides**: `[in] int64_t*` array strides (in bytes).
-   **offset**: `[in] int64_t` index offset.

```c
int64_t stdlib_ndarray_max_view_buffer_index( const int64_t ndims, const int64_t *shape, const int64_t *strides, const int64_t offset );
```

</section>

<!-- /.usage -->

<!-- C API usage notes. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="notes">

</section>

<!-- /.notes -->

<!-- C API usage examples. -->

<section class="examples">

### Examples

```c
#include "stdlib/ndarray/base/max_view_buffer_index.h"
#include <stdint.h>
#include <stdio.h>
#include <inttypes.h>

int main( void ) {
    // Specify the number of dimensions:
    const int64_t ndims = 2;

    // Define an array shape:
    const int64_t shape[] = { 10, 10 };

    // Define array strides:
    const int64_t strides[] = { -2, 5 };

    // Define an offset:
    const int64_t offset = 100;

    // Compute the maximum accessible index:
    int64_t idx = stdlib_ndarray_max_view_buffer_index( ndims, shape, strides, offset );

    // Print the results:
    printf( "idx: %"PRId64"\n", idx );
}
```

</section>

<!-- /.examples -->

</section>

<!-- /.c -->

<!-- Section to include cited references. If references are included, add a horizontal rule *before* the section. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="references">

</section>

<!-- /.references -->

<!-- Section for related `stdlib` packages. Do not manually edit this section, as it is automatically populated. -->

<section class="related">

</section>

<!-- /.related -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->


<section class="main-repo" >

* * *

## Notice

This package is part of [stdlib][stdlib], a standard library for JavaScript and Node.js, with an emphasis on numerical and scientific computing. The library provides a collection of robust, high performance libraries for mathematics, statistics, streams, utilities, and more.

For more information on the project, filing bug reports and feature requests, and guidance on how to develop [stdlib][stdlib], see the main project [repository][stdlib].

#### Community

[![Chat][chat-image]][chat-url]

---

## License

See [LICENSE][stdlib-license].


## Copyright

Copyright &copy; 2016-2025. The Stdlib [Authors][stdlib-authors].

</section>

<!-- /.stdlib -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="links">

[npm-image]: http://img.shields.io/npm/v/@stdlib/ndarray-base-max-view-buffer-index.svg
[npm-url]: https://npmjs.org/package/@stdlib/ndarray-base-max-view-buffer-index

[test-image]: https://github.com/stdlib-js/ndarray-base-max-view-buffer-index/actions/workflows/test.yml/badge.svg?branch=main
[test-url]: https://github.com/stdlib-js/ndarray-base-max-view-buffer-index/actions/workflows/test.yml?query=branch:main

[coverage-image]: https://img.shields.io/codecov/c/github/stdlib-js/ndarray-base-max-view-buffer-index/main.svg
[coverage-url]: https://codecov.io/github/stdlib-js/ndarray-base-max-view-buffer-index?branch=main

<!--

[dependencies-image]: https://img.shields.io/david/stdlib-js/ndarray-base-max-view-buffer-index.svg
[dependencies-url]: https://david-dm.org/stdlib-js/ndarray-base-max-view-buffer-index/main

-->

[chat-image]: https://img.shields.io/gitter/room/stdlib-js/stdlib.svg
[chat-url]: https://app.gitter.im/#/room/#stdlib-js_stdlib:gitter.im

[stdlib]: https://github.com/stdlib-js/stdlib

[stdlib-authors]: https://github.com/stdlib-js/stdlib/graphs/contributors

[umd]: https://github.com/umdjs/umd
[es-module]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules

[deno-url]: https://github.com/stdlib-js/ndarray-base-max-view-buffer-index/tree/deno
[deno-readme]: https://github.com/stdlib-js/ndarray-base-max-view-buffer-index/blob/deno/README.md
[umd-url]: https://github.com/stdlib-js/ndarray-base-max-view-buffer-index/tree/umd
[umd-readme]: https://github.com/stdlib-js/ndarray-base-max-view-buffer-index/blob/umd/README.md
[esm-url]: https://github.com/stdlib-js/ndarray-base-max-view-buffer-index/tree/esm
[esm-readme]: https://github.com/stdlib-js/ndarray-base-max-view-buffer-index/blob/esm/README.md
[branches-url]: https://github.com/stdlib-js/ndarray-base-max-view-buffer-index/blob/main/branches.md

[stdlib-license]: https://raw.githubusercontent.com/stdlib-js/ndarray-base-max-view-buffer-index/main/LICENSE

</section>

<!-- /.links -->
