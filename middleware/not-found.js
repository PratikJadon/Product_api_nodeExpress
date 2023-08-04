const notfound = (req, res) => {
  res.status(404).send("Page Not Found Here");
};

module.exports = notfound;
