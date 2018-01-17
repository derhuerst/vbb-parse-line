'use strict'

const assert = require('assert')

const parse = require('./index.js')



const tests = {
	// subway (U-Bahn)
	'U7': {m: 'train', p: 'subway', s: 'U', nr: 7, mt: false, x: false, n: false},
	'U55': {m: 'train', p: 'subway', s: 'U', nr: 55, mt: false, x: false, n: false},

	// tram
	'12': {m: 'train', p: 'tram', s: null, nr: 12, mt: false, x: false, n: false},
	'68': {m: 'train', p: 'tram', s: null, nr: 68, mt: false, x: false, n: false},

	// metro tram
	'M1': {m: 'train', p: 'tram', s: 'M', nr: 1, mt: true, x: false, n: false},
	'M17': {m: 'train', p: 'tram', s: 'M', nr: 17, mt: true, x: false, n: false},

	// bus
	'100': {m: 'bus', p: 'bus', s: null, nr: 100, mt: false, x: false, n: false},
	'399': {m: 'bus', p: 'bus', s: null, nr: 399, mt: false, x: false, n: false},
	'520': {m: 'bus', p: 'bus', s: null, nr: 520, mt: false, x: false, n: false},
	'771': {m: 'bus', p: 'bus', s: null, nr: 771, mt: false, x: false, n: false},
	'893': {m: 'bus', p: 'bus', s: null, nr: 893, mt: false, x: false, n: false},

	// weird buses in Brandenburg
	'A': {m: 'bus', p: 'bus', s: 'A', nr: null, mt: false, x: false, n: false},
	'W': {m: 'bus', p: 'bus', s: 'W', nr: null, mt: false, x: false, n: false},
	'E/525': {m: 'bus', p: 'bus', s: 'E', nr: 525, mt: false, x: false, n: false},
	'H/528': {m: 'bus', p: 'bus', s: 'H', nr: 528, mt: false, x: false, n: false},

	// night buses in Brandenburg
	'N4': {m: 'bus', p: 'bus', s: 'N', nr: 4, mt: false, x: false, n: true},

	// demand-responsive bus in Busverkehr Oder-Spree
	'412/2': {m: 'bus', p: 'bus', s: null, nr: 412, mt: false, x: false, n: false},

	// bus in Cottbus
	'15-44': {m: 'bus', p: 'bus', s: null, nr: 15, mt: false, x: false, n: false},

	// metro bus,
	'M11': {m: 'bus', p: 'bus', s: 'M', nr: 11, mt: true, x: false, n: false},
	'M85': {m: 'bus', p: 'bus', s: 'M', nr: 85, mt: true, x: false, n: false},

	// night bus Berlin,
	'N1': {m: 'bus', p: 'bus', s: 'N', nr: 1, mt: false, x: false, n: true},
	'N97': {m: 'bus', p: 'bus', s: 'N', nr: 97, mt: false, x: false, n: true},

	// night bus somewhere else,
	'5N': {m: 'bus', p: 'bus', s: 'N', nr: 5, mt: false, x: false, n: true},

	// express bus
	'X83': {m: 'bus', p: 'bus', s: 'X', nr: 83, mt: false, x: true, n: false},
	'X7': {m: 'bus', p: 'bus', s: 'X', nr: 7, mt: false, x: true, n: false},
	'TXL': {m: 'bus', p: 'bus', s: 'TXL', nr: null, mt: true, x: true, n: true},
	'SXF2': {m: 'bus', p: 'bus', s: 'SXF', nr: 2, mt: false, x: true, n: false},

	// rail replacement bus
	'SEV': {m: 'bus', p: 'bus', s: null, nr: null, mt: true, x: false, n: false},

	// ferry
	'F10': {m: 'watercraft', p: 'ferry', s: 'F', nr: 10, mt: false, x: false, n: false},
	'F24': {m: 'watercraft', p: 'ferry', s: 'F', nr: 24, mt: false, x: false, n: false},

	// suburban trains (S-Bahn)
	'S1': {m: 'train', p: 'suburban', s: 'S', nr: 1, mt: false, x: false, n: false},
	'S85': {m: 'train', p: 'suburban', s: 'S', nr: 85, mt: false, x: false, n: false},

	// regional express trains
	'RE1': {m: 'train', p: 'regional', s: 'RE', nr: 1, mt: false, x: true, n: false},
	'RE78': {m: 'train', p: 'regional', s: 'RE', nr: 78, mt: false, x: true, n: false},
	'IRE': {m: 'train', p: 'regional', s: 'IRE', nr: null, mt: false, x: true, n: false},

	// regional trains
	'RB10': {m: 'train', p: 'regional', s: 'RB', nr: 10, mt: false, x: false, n: false},
	'RB93': {m: 'train', p: 'regional', s: 'RB', nr: 93, mt: false, x: false, n: false},
	'OE65': {m: 'train', p: 'regional', s: 'OE', nr: 65, mt: false, x: false, n: false},

	// national express trains
	'ICE1701': {m: 'train', p: 'express', s: 'ICE', nr: 1701, mt: false, x: false, n: false},

	// national night trains
	'EN471': {m: 'train', p: 'express', s: 'EN', nr: 471, mt: false, x: false, n: true},

	// national trains
	'IC2073': {m: 'train', p: 'express', s: 'IC', nr: 2073, mt: false, x: false, n: false},
	'EC45': {m: 'train', p: 'express', s: 'EC', nr: 45, mt: false, x: false, n: false},

	// Locomore
	'LOC1818': {m: 'train', p: 'express', s: 'LOC', nr: 1818, mt: false, x: false, n: false}
}

for (let name in tests) {
	const r = parse(name)
	const e = tests[name]

	assert.strictEqual(r._, name)
	assert.strictEqual(r.mode, e.m, `${name} mode: ${r.mode} !== ${e.m}`)
	assert.strictEqual(r.product, e.p, `${name} product: ${r.product} !== ${e.p}`)
	assert.strictEqual(r.symbol, e.s, `${name} symbol: ${r.symbol} !== ${e.s}`)
	assert.strictEqual(r.nr, e.nr, `${name} nr: ${r.nr} !== ${e.nr}`)
	assert.strictEqual(r.metro, e.mt, `${name} metro: ${r.metro} !== ${e.mt}`)
	assert.strictEqual(r.express, e.x, `${name} express: ${r.express} !== ${e.x}`)
	assert.strictEqual(r.night, e.n, `${name} night: ${r.night} !== ${e.n}`)
}

assert.deepStrictEqual(parse('M17'), parse('Bus M17'))
assert.deepStrictEqual(parse('TXL'), parse('Bus TXL'))
assert.deepStrictEqual(parse('M2'), parse('Tram M2'))
