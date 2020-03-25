https = require("https");

module.exports = {
  //  using github api docs:
  //    "repository_url": "https://api.github.com/users/{owner}/repos"
  query: function(user) {
    // headers options
    const options = {
      hostname: "api.github.com",
      port: 443,
      path: "/users/" + user + "/repos",
      method: "GET",
      headers: { "user-agent": "Mozilla/5.0" }
    };

    return new Promise(function(resolve, reject) {
      // perform a GET
      var str = "";
      var ret = "";

      const req = https.request(options, res => {
        res.on("data", data => {
          str += data;
        });
        res.on("end", function() {
          try {
            let json = JSON.parse(str);
            // for testing purposes only
            ret =
              "Number of '" +
              user +
              "' user repositories: " +
              json.length +
              "\n";
            // we are waiting a array
            if (json.length == 0) ret += "No repositories";
            else if (json.length == 3) ret += "There are three repositories";
            else if (json.length > 3) ret += "There are a lot of repositories";
          } catch (error) {
            ret = "Error parsing JSON";
          }
          resolve(ret);
        });
      });
      // if error
      req.on("error", error => {
        ret = "I cannot connect to the server";
        reject(ret);
      });
      // when finish the request
      req.end();
    });
  }
};
