'use latest';
'use strict';
const fetch = require('fetch-retry');
const Promise = require('bluebird');
const moment = require('moment');

module.exports = (ctx, done) => {
  let symbols = ctx.data.symbols ? ctx.data.symbols.split(',') : [];

  if (symbols.length === 0) {
    done('Please provide a symbols query parameter for the stocks you want to query');
  }

  let results = {};

  Promise
    .each(symbols, symbol => {
      return getStockHistory(symbol)
        .then(result => {
          if (!result || !result.ticker || !result.ticker.graphData) {
            throw new Error(`Missing ticker data. Symbol ${symbol} might be an unrecognized ticker symbol`);
          }
          results[symbol] = result.ticker.graphData.map(entry => {
            return [
              moment(entry[0]).format('YYYY-MM-DD'),
              entry[1]
              ];
          });
        })
        .then(() => { return wait(100); })
    })
    .then(() => {
      done(null, results);
    })
    .catch(error => {
      done(error)
    });
}

const getStockHistory = (symbol) => {
  let url = `http://e24.no/api/market/?ticker=${symbol}.OSE&interval=day`;

  return fetch(url, { credentials: 'include' })
    .then(response => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      } else {
        throw new Error(symbol + ' returned http status code: ' + response.status);
      }
    })
    .then(json => {
      return json;
    });
}

const wait = (ms) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}