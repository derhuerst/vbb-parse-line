'use strict'

const spaces = /\s+/g
const symbolOnly = /^[a-z]{1,3}$/i
const numberOnly = /^[\d]+$/i
const symbolAndNumber = /^(([a-z]{1,3})([\d]+)|([\d]+)([a-z]{1,3}))/i

const types = {
	  'ICE': 'express'
	, 'IC': 'express'
	, 'EC': 'express'
	, 'EN': 'express'
	, 'LOC': 'express'
	, 'RE': 'regional'
	, 'RB': 'regional'
	, 'OE': 'regional'
	, 'U':  'subway'
	, 'S':  'suburban'
	, 'F':  'ferry'
	, 'N':  'bus'
	, 'X':  'bus'
}

const parse = (name) => {
	name = name.toUpperCase().replace(spaces, '')
	let r = {_: name,
		type: null, symbol: null, nr: null,
		metro: false, express: false, night: false
	}

	// weird buses in Berlin
	if (name === 'TXL') return {_: name,
		type: 'bus', symbol: 'TXL', nr: null,
		metro: true, express: true, night: true
	}
	if (name === 'SXF2') return {_: name,
		type: 'bus', symbol: 'SXF', nr: 2,
		metro: false, express: true, night: false
	}
	if (name === 'SEV') return {_: name,
		type: 'bus', symbol: null, nr: null,
		metro: true, express: false, night: false
	}

	if (symbolOnly.test(name)) {
		r.symbol = name
		r.type = 'bus'
	} else if (numberOnly.test(name)) { // bus & tram lines
		r.nr = parseInt(name)
	} else {
		const matches = symbolAndNumber.exec(name)
		if (matches[2] && matches[3]) {
			r.symbol = matches[2]
			r.nr = parseInt(matches[3])
		} else if (matches[4] && matches[5]) { // night bus somewhere else
			r.nr = parseInt(matches[4])
			r.symbol = matches[5]
		} else throw new Error('houston we have a problem')
	}

	if (Number.isNaN(r.nr)) r.nr = null

	// handle bus & tram lines with symbol
	     if (r.symbol === 'M') r.metro   = true
	else if (r.symbol === 'X') r.express = true
	else if (r.symbol === 'N') r.night   = true

	// handle weird metro bus & metro tram naming
	if (!r.type) {
		r.type = types[r.symbol]
		if (!r.symbol) r.type = r.nr < 100 ? 'tram' : 'bus'
		else if (r.symbol === 'M')
			r.type = (r.nr <= 17 && r.nr !== 11) ? 'tram' : 'bus'
	}

	if (r.symbol === 'RE') r.express = true // regional express trains
	else if (r.symbol === 'EN') r.night = true // national night trains

	return r
}

module.exports = parse
