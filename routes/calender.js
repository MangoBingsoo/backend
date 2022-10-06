const express = require("express");
const router = express.Router();
const Calender = require("../schemas/Calender");

router.get("/", (req, res, next) => {
  Calender.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

router.post("/postca", (req, res, next) => {
  const calenders = new Calender({
    date: `${req.body.date}`,
    feeling: `${req.body.feeling}`,
  });
  calenders
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

// router.patch("/:calender", (req, res, next) => {
//   Calender.update(
//     { date: req.params.date },
//     { feeling: req.body.feeling }
//      )
//     .then((result) => {
//       res.json(result);
//     })
//     .catch((err) => {
//       console.error(err);
//       next(err);
//     });
// });

router.delete(":/calender", (req, res, next) => {
  Calender.remove({ date: req.params.date })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
    });
});

module.exports = router;
