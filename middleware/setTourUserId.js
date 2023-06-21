export default function setTourUserId(req, res, next) {
  if (!req.body.tours) req.body.tours = req.params.tourId;
  if (!req.body.users) req.body.users = req.user.id;
  next();
}
