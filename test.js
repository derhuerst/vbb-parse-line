'use strict'

const assert = require('assert')

const parse  = require('./index.js')



const tests = {

	// subway (ubahn)
	  'U7':   {t: 'subway',   s: 'U',   nr: 7,    m: false, x: false, n: false}
	, 'U55':  {t: 'subway',   s: 'U',   nr: 55,   m: false, x: false, n: false}

	// tram
	, '12':   {t: 'tram',     s: null,  nr: 12,   m: false, x: false, n: false}
	, '68':   {t: 'tram',     s: null,  nr: 68,   m: false, x: false, n: false}

	// metro tram
	, 'M1':   {t: 'tram',     s: 'M',   nr: 1,    m: true,  x: false, n: false}
	, 'M17':  {t: 'tram',     s: 'M',   nr: 17,   m: true,  x: false, n: false}

	// bus
	, '100':  {t: 'bus',      s: null,  nr: 100,  m: false, x: false, n: false}
	, '399':  {t: 'bus',      s: null,  nr: 399,  m: false, x: false, n: false}
	, '520':  {t: 'bus',      s: null,  nr: 520,  m: false, x: false, n: false}
	, '771':  {t: 'bus',      s: null,  nr: 771,  m: false, x: false, n: false}
	, '893':  {t: 'bus',      s: null,  nr: 893,  m: false, x: false, n: false}

	// weird buses in Brandenburg
	, 'A':    {t: 'bus',      s: 'A',   nr: null, m: false, x: false, n: false}
	, 'W':    {t: 'bus',      s: 'W',   nr: null, m: false, x: false, n: false}
	, 'E/525': {t: 'bus',     s: 'E',   nr: 525,  m: false, x: false, n: false}
	, 'H/528': {t: 'bus',     s: 'H',   nr: 528,  m: false, x: false, n: false}

	// night buses in Brandenburg
	, 'N4':   {t: 'bus',      s: 'N',   nr: 4,    m: false, x: false, n: true}

	// demand-responsive bus in Busverkehr Oder-Spree
	, '412/2': {t: 'bus',     s: null,  nr: 412,  m: false, x: false, n: false}

	// bus in Cottbus
	, '15-44': {t: 'bus',     s: null,  nr: 15,   m: false, x: false, n: false}

	// metro bus
	, 'M11':  {t: 'bus',      s: 'M',   nr: 11,   m: true,  x: false, n: false}
	, 'M85':  {t: 'bus',      s: 'M',   nr: 85,   m: true,  x: false, n: false}

	// night bus Berlin
	, 'N1':   {t: 'bus',      s: 'N',   nr: 1,    m: false, x: false, n: true}
	, 'N97':  {t: 'bus',      s: 'N',   nr: 97,   m: false, x: false, n: true}

	// night bus somewhere else
	, '5N':   {t: 'bus',      s: 'N',   nr: 5,    m: false, x: false, n: true}

	// express bus
	, 'X83':  {t: 'bus',      s: 'X',   nr: 83,   m: false, x: true,  n: false}
	, 'X7':   {t: 'bus',      s: 'X',   nr: 7,    m: false, x: true,  n: false}
	, 'TXL':  {t: 'bus',      s: 'TXL', nr: null, m: true,  x: true,  n: true}
	, 'SXF2': {t: 'bus',      s: 'SXF', nr: 2,    m: false, x: true,  n: false}

	// rail replacement bus
	, 'SEV':  {t: 'bus',      s: null,  nr: null, m: true,  x: false, n: false}

	// ferry
	, 'F10':  {t: 'ferry',    s: 'F',   nr: 10,   m: false, x: false, n: false}
	, 'F24':  {t: 'ferry',    s: 'F',   nr: 24,   m: false, x: false, n: false}

	// suburban trains (sbahn)
	, 'S1':   {t: 'suburban', s: 'S',   nr: 1,    m: false, x: false, n: false}
	, 'S85':  {t: 'suburban', s: 'S',   nr: 85,   m: false, x: false, n: false}

	// regional express trains
	, 'RE1':  {t: 'regional', s: 'RE',  nr: 1,    m: false, x: true,  n: false}
	, 'RE78': {t: 'regional', s: 'RE',  nr: 78,   m: false, x: true,  n: false}
	, 'IRE':  {t: 'regional', s: 'IRE', nr: null, m: false, x: true,  n: false}

	// regional trains
	, 'RB10': {t: 'regional', s: 'RB',  nr: 10,   m: false, x: false, n: false}
	, 'RB93': {t: 'regional', s: 'RB',  nr: 93,   m: false, x: false, n: false}
	, 'OE65': {t: 'regional', s: 'OE',  nr: 65,   m: false, x: false, n: false}

	// national express trains
	, 'ICE1701': {t: 'express', s: 'ICE', nr: 1701, m: false, x: false, n: false}

	// national night trains
	, 'EN471': {t: 'express', s: 'EN', nr: 471, m: false, x: false, n: true}

	// national trains
	, 'IC2073': {t: 'express', s: 'IC', nr: 2073, m: false, x: false, n: false}
	, 'EC45': {t: 'express', s: 'EC', nr: 45, m: false, x: false, n: false}

	// Locomore
	, 'LOC1818': {t: 'express', s: 'LOC', nr: 1818, m: false, x: false, n: false}

}

for (let name in tests) {
	const r = parse(name)
	const e = tests[name]

	assert.strictEqual(r._,       name)
	assert.strictEqual(r.type,    e.t, `${name} type: ${r.type} !== ${e.t}`)
	assert.strictEqual(r.symbol,  e.s, `${name} symbol: ${r.symbol} !== ${e.s}`)
	assert.strictEqual(r.nr,      e.nr, `${name} nr: ${r.nr} !== ${e.nr}`)
	assert.strictEqual(r.metro,   e.m, `${name} metro: ${r.metro} !== ${e.m}`)
	assert.strictEqual(r.express, e.x, `${name} express: ${r.express} !== ${e.x}`)
	assert.strictEqual(r.night,   e.n, `${name} night: ${r.night} !== ${e.n}`)
}

assert.deepStrictEqual(parse('M17'), parse('Bus M17'))
assert.deepStrictEqual(parse('TXL'), parse('Bus TXL'))
