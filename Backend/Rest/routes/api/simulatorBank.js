const router = require("express").Router();

const request = require("../../middleware/requests");



/* PROFILE */
router.post("/", /* auth.optional, */  async  (req, res, next)=> {

  console.log("eh")
  user = await request.get_user_token("eh");
  console.log(user)

  return res.json({ user });
  // if (req.payload) {
  //   /* SI ESTÁS REGISTRAT HAS DE VEURE EasdLS SEUS FOLLOWINGS, ELS FOLLOWERS I SI LI FAS FOLLOW */
  //   User.findById(req.payload.id).then(function (user) {
  //     if (!user) {
  //       return res.json({
  //         valoration: req.valoration,
  //         profile: req.profile.toProfileJSONFollowers(
  //           req.profile.following,
  //           req.valoration
  //         ),
  //       });
  //     }
  //     return res.json({
  //       valoration: req.valoration,
  //       profile: req.profile.toProfileJSONFollowers(
  //         req.profile.following,
  //         req.valoration,
  //         user
  //       ),
  //     });
  //   });
  // } else {
  //   /* SINO ESTÁS REGISTRAT, SOLS HAURÀS DE VORE ELS SEUS FOLLOWINGS I ELS FOLLOWERS */
  //   return res.json({
  //     profile: req.profile.toProfileJSONFollowers(
  //       req.profile.following,
  //       req.valoration
  //     ),
  //   });
  // }
});

module.exports = router;
