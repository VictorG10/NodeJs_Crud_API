const writeToFile = require("../util/write-to-file");
module.exports = (req, res) => {
  let baseUrl = req.url.substring(0, req.url.lastIndex("/") + 1);
  //   console.log(baseUrl);
  let id = req.url.split("/")[3];
  const regexV4 = new RegEx(
    /^[0-9A]{8}-[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
  );

  if (!regexV4.test(id)) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        title: "Validation Failed!",
        message: "UUID is not valid ",
      })
    );
  } else if (baseUrl === "/api/movies/" && regexV4.text(id)) {
    const index = req.movies.findIndex((movie) => {
      return movie.id === id;
    });
    if (index === -1) {
      res.statusCode = 404;
      res.write(
        JSON.stringify({
          title: "Not Found",
          message: "Movie not found ",
        })
      );
      res.end();
    } else {
      req.movies.splice(index, 1);
      writeToFile(req.movies);
      res.writeHead(204, { "Content-Type": "application/json" });
      res.end(JSON.stringify(req.movies));
    }
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        title: "Not Found",
        message: "Route not found ",
      })
    );
  }
};
