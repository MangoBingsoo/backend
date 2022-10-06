const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/", function (req, res, next) {
  res.sendFile(path.join(__dirname, "..", "index.html"));
});

// router.get('*', (req,res) => {
//   res.sendFile(path.join(__dirname, '[프로젝트이름]/build/index.html'))
// })
//프로젝트 이름에는 괄호를 없애고 넣어주면 작동될거임

router.use("/question", require("./questions"));
router.use("/auth", require("./auth"));
router.use("/calender", require("./calender"));

module.exports = router;
