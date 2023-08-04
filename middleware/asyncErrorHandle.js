const asyncErrorHandle = (err, req, res, next) => {
  res.status(404).json({ msg: "Something went Wrong" });
};

module.exports = asyncErrorHandle;
