const router = require("express").Router();
const fs = require("fs");
const path = require('path');

const request = require("../../middleware/requests");



/* PROFILE */
router.post("/", /* auth.optional, */  async (req, res, next) => {
  const keys = ["cardName", "cardNumber", "expDate", "cvv"]
  const usersBankString = fs.readFileSync(path.join(__dirname, '../../utils/products.json'));
  const jsonUsersBank = JSON.parse(usersBankString);



  let index = jsonUsersBank.findIndex((userBank) => { return userBank.cardName === req.body.cardName })



  if (index != undefined && index !== -1) {
    try {
      let checkCard = keys.findIndex((key) => { return jsonUsersBank[index][key] !== req.body[key] })
      if (checkCard == undefined || checkCard === -1) {

        let user = await request.get_user_token(req.headers.authorization);
        // console.log(ObjectKeys(user))
        if (user.status && user.status === 404) {
          return res.status(404).send({ message: 'Existes en la Base de datos?!' })
        } else {
          // return res.json(user);

          if (jsonUsersBank[index]["moneyBank"] >= req.body["moneyCard"]) {
            let response = await request.post_money( req.body["moneyCard"], req.headers.authorization);

            if (response.status && response.status === 404) {
              return res.status(404).send({ message: 'Ha habido un problema en DJANGO' })
            } else {
              return res.status(200).send(response)
            }
          } else {
            console.log("no hi ha saldo suficient")
            return res.status(404).send({ message: 'No hay saldo suficiente' })
          }
        }

      } else {
        return res.status(404).send({ message: 'Algún dato no es válido!' })
      }
    } catch (error) {
      console.log(error)
      return res.status(500).send({ message: 'Algo ha fallado!' })
    }
  } else {

    return res.status(404).send({ message: 'No existe este titular!' })


  }

  return res.json(req.body);
  return res.status(500).send({ message: 'Algo ha fallado!' })

});

module.exports = router;
