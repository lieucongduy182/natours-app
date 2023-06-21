export default function getMe(req, res, next) {
  req.params.id = req.user.id;
  next();
}
