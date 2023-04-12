const stripe = require("stripe")("STRIPE_KEY");
const { v4: uuidv4 } = require("uuid");

exports.stripePayment = (req, res) => {
    const { product, token } = req.body;
    const idempotencyKey = uuidv4();

    stripe.customers
        .create({
            email: token.email,
            source: token.id
        })
        .then(customer =>
            stripe.charges
                .create({
                    amount: product.price * 100,
                    currency: "usd",
                    customer: customer.id,
                    receipt_email: token.email,
                    description: `purchase of ${product.name}`,
                    shipping: {
                        name: token.card.name,
                        address: {
                            line1: token.card.address_line1,
                            line2: token.card.address_line2,
                            city: token.card.address_city,
                            country: token.card.address_country,
                            postal_code: token.card.address_zip
                        }
                    }
                },
                    { idempotencyKey }
                ))
        .then(result => res.status(200).json(result))
        .catch(error => res.status(400).json(error))
}