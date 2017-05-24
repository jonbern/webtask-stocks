const webtask = require('./index');

let arg = process.argv[2].split('=');

let argName = arg[0];
let argValue = arg[1];

let ctx = {
  data: {
    [argName]: argValue
  }
};

webtask(ctx, (error, result) => {
  if (error) {
    console.log(error);
  } else {
    console.log(result);
  }
});