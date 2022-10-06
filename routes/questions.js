const express = require('express');
const router = express.Router();
const Question = require('../schemas/Question');

router.get('/', (req, res, next) => {
  Question.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    })
});

router.post('/', (req, res, next) => {
  const questions = new Question({
    "category": `${req.body.category}`,
    "question": `${req.body.question}`,
    "answer": `${req.body.answer}`
  })
  questions.save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    })
})

router.patch('/:question', (req, res, next) => {
    Comment.update(
      { id: req.params.id },
      { comment: req.body.comment })
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        console.error(err);
        next(err);
      })
  });
  
  router.delete(':/question', (req, res, next) => {
    Comment.remove({ id: req.params.id })
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        console.error(err);
        next(err);
      })
  })

module.exports = router;