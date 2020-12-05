const fetch = require("node-fetch");
const AWS = require("aws-sdk");

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

      console.log(user);

      // Configure client for use with Spaces
      const spacesEndpoint = new AWS.Endpoint(process.env.S3_ENDPOINT);
      const s3 = new AWS.S3({
        endpoint: spacesEndpoint,
        accessKeyId: process.env.S3_KEY,
        secretAccessKey: process.env.S3_SECRET,
      });

      if (jsondata.type == "json") {
        const filename = user.userId + "/data.json";
        var params = {
          Body: JSON.stringify(jsondata.data),
          Bucket: process.env.S3_BUCKET,
          Key: filename,
          ContentType: "application/json",
          ACL: "public-read",
        };
      } else if (jsondata.type == "html") {
        const filename = user.userId + "/index.html";
        var params = {
          Body: jsondata.data,
          Bucket: process.env.S3_BUCKET,
          Key: filename,
          ContentType: "text/html",
          ACL: "public-read",
        };
      } else if (jsondata.type == "image") {
        let base64 = jsondata.data;
        let base64data = new Buffer.from(
          base64.replace(/^data:image\/\w+;base64,/, ""),
          "base64"
        );
        let imgtype = base64.split(";")[0].split("/")[1];
        const filename =
          user.userId + "/img/" +
          Math.random().toString(36).substring(2, 15) +
          Math.random().toString(36).substring(2, 15) +
          "." +
          imgtype;
        var params = {
          Body: base64data,
          Bucket: process.env.S3_BUCKET,
          Key: filename,
          ContentEncoding: "base64",
          ContentType: `image/${imgtype}`,
          ACL: "public-read",
        };
      }

      console.log(params);

      s3.putObject(params, function(err, data) {
        if (err) {
          console.log("error" + err);
        } else {
          console.log(data);
          res.json({
            ok: true,
            msg: "File sucessfully uploaded",
            filename: "https://" + process.env.S3_BUCKET + "." + process.env.S3_ENDPOINT + "/" + params.Key
          });
        }
      });

    })
    .catch(function(err) {
      res.json({
        ok: false,
        msg: "error before uploading: " + err
      });
    });
};