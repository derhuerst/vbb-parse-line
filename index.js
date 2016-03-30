'use strict'

const spaces = /\s+/g
const hasSymbol = /^([a-z]{1,2})/i

const types = {
	  'RE': 'regional'
	, 'RB': 'regional'
	, 'U':  'subway'
	, 'S':  'suburban'
	, 'F':  'ferry'
	, 'N':  'bus'
	, 'X':  'bus'
}

const parse = (name) => {
	name = name.toUpperCase().replace(spaces, '')
	let r = {
		type: null, symbol: null, nr: null,
		metro: false, express: false, night: false
	}

	if (name === 'TXL') return {
		type: 'bus', symbol: 'TXL', nr: null,
		metro: true, express: true, night: true
	}

	// bus & tram lines
	if (hasSymbol.test(name)) r.symbol = hasSymbol.exec(name)[0]
	r.nr = parseInt(name.substr((r.symbol || '').length))

	// handle bus & tram lines with symbol
	     if (r.symbol === 'M') r.metro   = true
	else if (r.symbol === 'X') r.express = true
	else if (r.symbol === 'N') r.night   = true

	// handle weird metro bus & metro tram naming
	r.type = types[r.symbol]
	if (!r.type) {
		if (!r.symbol) r.type = r.nr < 100 ? 'tram' : 'bus'
		else if (r.symbol === 'M')
			r.type = (r.nr <= 17 && r.nr !== 11) ? 'tram' : 'bus'
	}

	// handle regional express trains
	if (r.symbol === 'RE') r.express = true

	return r
}

module.exports = parse
