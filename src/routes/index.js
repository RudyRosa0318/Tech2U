const express = require("express");
const router = express.Router();
const stripe = require("stripe")('sk_test_51H5lSsKfonblX5qIvwoTUBUJouItcvUbTLKlo2Ac7dlzybifJW1n7kj6XESVzhmSyS1p554Tf8SwAsLRnZvpIRAQ00T0PnH3hM');

const {
  renderIndex,
  renderDescription,
  obtenerProductoPorId,
} = require("../controller/index.controller");
const { renderCart } = require("../controller/links.controller");

router.get("/", renderIndex);

router.get("/description", renderDescription);
router.get("/description/:id", obtenerProductoPorId);
//  router.get('/',indexc);

router.post("/checkout", async (req, res)=>{
  console.log(req.body);
  const custumer = await stripe.custumers.create({
    email: req.body.stripeEmail,
    source: req.body.stripeToken
  });
  const charge = stripe.charges.create({
    //amount: '',
    //currency: 'usd',
    custumer: custumer.id,
    //description: '' 
  })
  console.log(custumer);
  console.log(charge.id);
  res.send('Recibido');
})

module.exports = router;
