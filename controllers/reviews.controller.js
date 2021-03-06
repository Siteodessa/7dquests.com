const Review = require('../db/models/reviews.model.js');
exports.create = (req, res) => {
    const review = new Review({    // Create a Review
      author: req.body.author || "",
      review_body: req.body.review_body || "",
      rating: req.body.rating || "",
      quest: req.body.quest || "",
      image: req.body.image || "",
      mail: req.body.mail || "",
    });

    review.save()    // Save Review in the database
    .then(data => {
      res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Review."

        });
    });
};


exports.findAll = (req, res) => { // Retrieve and return all reviews from the database.
    Review.find()
    .then(reviews => {
        res.status(200).send(reviews);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving reviews."
        });
    });
};
exports.findOne = (req, res) => {// Find a single review with a reviewId
    Review.findById(req.params.reviewId)
    .then(review => {
        if(!review) {
            return res.status(404).send({
                message: "Review not found with id " + req.params.reviewId
            });
        }
        res.send(review);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Review not found with id " + req.params.reviewId
            });
        }
        return res.status(500).send({
            message: "Error retrieving review with id " + req.params.reviewId
        });
    });
};
exports.custom_update = (req, res) => {

var the_data = '';
for (let prop in req.body) {

  if (!JSON.parse(req.body[prop])){console.error('ERO');}
  the_data = JSON.parse(prop)
}
delete the_data["reviewId"];
    Review.findByIdAndUpdate(req.params.reviewId, the_data, {new: true})
    .then(review => {
        if(!review) {
            return res.status(404).send({
                message: "Review not found with id " + req.params.reviewId
            });
        }
        res.status(200).send(the_data);
        for (var member in myObject) delete myObject[member];
    }).catch(err => {
        if(err.kind === 'ObjectId') {

            return res.status(404).send({
                message: "Review not found with id " + req.params.reviewId
            });
        }

        return res.status(500).send({
            message: "Error updating review with id " + req.params.reviewId
        });
    });
};


exports.update = (req, res) => {
    if(!req.body.content) {
        return res.status(400).send({
            message: "Review content can not be empty"
        });
    }
    Review.findByIdAndUpdate(req.params.reviewId, {
      // title: req.body.title || "Budova.partners",

    }, {new: true})
    .then(review => {
        if(!review) {
            return res.status(404).send({

                message: "Review not found with id " + req.params.reviewId
            });
        }
        res.status(200).send(review);
    }).catch(err => {
        if(err.kind === 'ObjectId') {

            return res.status(404).send({
                message: "Review not found with id " + req.params.reviewId
            });
        }

        return res.status(500).send({
            message: "Error updating review with id " + req.params.reviewId
        });
    });
};
exports.delete = (req, res) => {
    Review.findByIdAndRemove(req.params.reviewId)
    .then(review => {
        if(!review) {
            return res.status(404).send({
                message: "Review not found with id " + req.params.reviewId
            });
        }
        res.status(200).send({message: "Review deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Review not found with id " + req.params.reviewId
            });
        }
        return res.status(500).send({
            message: "Could not delete review with id " + req.params.reviewId
        });
    });
};
