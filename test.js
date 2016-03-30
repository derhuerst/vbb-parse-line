#!/usr/bin/env node
'use strict'

const assert = require('assert')

const parse  = require('./index.js')



const tests = {

	// subway
	  'U7':  {t: 'subway', s: 'U',   nr: 7,    m: false, x: false, n: false}
	, 'U55': {t: 'subway', s: 'U',   nr: 55,   m: false, x: false, n: false}

	// tram
	, '12':  {t: 'tram',   s: null,  nr: 12,   m: false, x: false, n: false}
	, '68':  {t: 'tram',   s: null,  nr: 68,   m: false, x: false, n: false}

	// metro tram
	, 'M1':  {t: 'tram',   s: 'M',   nr: 1,    m: true,  x: false, n: false}
	, 'M17': {t: 'tram',   s: 'M',   nr: 17,   m: true,  x: false, n: false}

	// bus
	, '100': {t: 'bus',    s: null,  nr: 100,  m: false, x: false, n: false}
	, '399': {t: 'bus',    s: null,  nr: 399,  m: false, x: false, n: false}
	, '893': {t: 'bus',    s: null,  nr: 893,  m: false, x: false, n: false}

	// metro bus
	, 'M11': {t: 'bus',    s: 'M',   nr: 11,   m: true,  x: false, n: false}
	, 'M85': {t: 'bus',    s: 'M',   nr: 85,   m: true,  x: false, n: false}

	// night bus
	, 'N1':  {t: 'bus',    s: 'N',   nr: 1,    m: false, x: false, n: true}
	, 'N97': {t: 'bus',    s: 'N',   nr: 97,   m: false, x: false, n: true}

	// express bus
	, 'X83': {t: 'bus',    s: 'X',   nr: 83,   m: false, x: true,  n: false}
	, 'X7':  {t: 'bus',    s: 'X',   nr: 7,    m: false, x: true,  n: false}
	, 'TXL': {t: 'bus',    s: 'TXL', nr: null, m: false, x: true,  n: false}

	// ferry
	, 'F10': {t: 'ferry',  s: 'F',   nr: 10,   m: false, x: false, n: false}
	, 'F24': {t: 'ferry',  s: 'F',   nr: 24,   m: false, x: false, n: false}

}

for (let name in tests) {
	let result = parse(name)
	let expected = tests[name]
	assert.strictEqual(parse.type,    expected.t, 'wrong type')
	assert.strictEqual(parse.symbol,  expected.s, 'wrong symbol')
	assert.strictEqual(parse.nr,      expected.n, 'wrong numeral')
	assert.strictEqual(parse.metro,   expected.m, 'wrong metro flag')
	assert.strictEqual(parse.express, expected.x, 'wrong express flag')
	assert.strictEqual(parse.night,   expected.n, 'wrong night flag')
}
