function getCookies(request) {
  let cookie = request.headers.cookie;

  var output = {};
  cookie.split(/\s*;\s*/).forEach(function (pair) {
    pair = pair.split(/\s*=\s*/);
    var name = decodeURIComponent(pair[0]);
    var value = decodeURIComponent(pair.splice(1).join("="));
    output[name] = value;
  });

  console.log(output);

  return output;
}

module.exports = { getCookies };
