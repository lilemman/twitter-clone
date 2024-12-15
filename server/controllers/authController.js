exports.sigup = async (req, res) => {
  res.json({ data: "You have reached the register page" });
};

exports.login = async (req, res) => {
  res.json({ data: "You have reached the login page" });
};

exports.logout = async (req, res) => {
  res.json({ data: "You have reached the logout page" });
};
