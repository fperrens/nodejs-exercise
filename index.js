const git = require("./git");
const param = process.argv[2];

let user = param == undefined ? "fperrens" : param;

git
  .query(user)
  .then(res => console.log(res))
  .catch(rej => console.log(rej));
