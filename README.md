# Stock History Webtask

This webtask fetches historical stock prices of Norwegian stocks, using the API of the Norwegian newspaper e24.no

## Rationale

Previously, Yahoo Finance provided an API for querying this data, but since 16. May 2017 this API has been discontinued.

This webtask serves as an alternative to the Yahoo Finance API in that it can query Norwegian stock prices, which are often not available usinger other data providers, or just very expensive.

## Example
```
curl "https://wt-e6c64d205f556a8e3ea3b87c725292ae-0.run.webtask.io/stock-history-webtask?symbols=DNB,TEL,ASETEK,BOUVET,NTS,WILS,EMAS,PLCS,SKBN"
```

## Notes
This webtask will query all available history for each stock. Newer versions of this webtask might include the possibility of filtering on specific time periods.

### Running the webtask locally
This webtask can also be run locally using the webtask-local-runner.js script:

```
node webtask-local-runner.js symbols=DNB,TEL,ASETEK,BOUVET,NTS,WILS,EMAS,PLCS,SKBN
```
