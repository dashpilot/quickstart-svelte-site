const fetch = require("node-fetch");

module.exports = (req, res) => {
  const token = req.headers.authorization;
  const {
    body
  } = req;
  const jsondata = body;

  fetch("https://v1.userbase.com/v1/admin/auth-tokens/" + token, {
      headers: {
        Authorization: "Bearer " + process.env.UB_SECRET,
      },
    })
    .then((result) => result.json())
    .then(function(user) {

      const myhtml = jsondata.html.replace('{tag}', '<script src="app.js"></script>');

      fetch('https://api.vercel.com/v12/now/deployments', {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + process.env.VC_TOKEN,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "name": "test",
            "files": [{
                "file": "index.html",
                "data": myhtml
              },
              {
                "file": "style.css",
                "data": jsondata.css
              },
              {
                "file": "app.js",
                "data": jsondata.js
              }
            ],
            "alias": "test.sitefiction.me",
            "target": "production",
            "projectSettings": {
              "framework": null
            }
          })
        })
        .then((result) => result.json())
        .then(function(data) {

          res.json({
            ok: true,
            msg: "Site succesfully published",
            data: data
          });

        })
        .catch(function(err) {
          res.json({
            ok: false,
            msg: "error while publishing: " + err
          });
        });



    })
    .catch(function(err) {
      res.json({
        ok: false,
        msg: "error before uploading: " + err
      });
    });
};