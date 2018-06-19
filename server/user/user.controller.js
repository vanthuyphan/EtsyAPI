const User = require('./user.model');
const nodemailer = require('nodemailer');

function load(req, res, next, id) {
  User.get(id)
    .then((user) => {
      req.user = user;
      return next();
    })
    .catch(e => next(e));
}

function get(req, res) {
  return res.json(req.user);
}

function sendEmail(user) {
    var smtpTransport = nodemailer.createTransport("SMTP",{
        service: "Gmail",
        auth: {
            user: "vanthuyphan@gmail.com",
            pass: "F88kmenaya"
        }
    });

// setup e-mail data with unicode symbols
    var mailOptions = {
        from: "Team 6 ✔ <vanthuyphan@gmail.com>", // sender address
        to: user.email, // list of receivers
        subject: "Welcome ✔", // Subject line
        text: "Welcome " + user.name
    }

// send mail with defined transport object
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
        }else{
            console.log("Message sent: " + response.message);
        }

        // if you don't want to use this transport object anymore, uncomment following line
        //smtpTransport.close(); // shut down the connection pool, no more messages
    });
}

function create(req, res, next) {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  user.save()
    .then(
        savedUser => {
          sendEmail(savedUser);
          res.json(savedUser)
        }
    )
    .catch(e => next(e));
}

function update(req, res, next) {
  const user = req.user;
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;

  user.save()
    .then(savedUser => res.json(savedUser))
    .catch(e => next(e));
}

function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  User.list({ limit, skip })
    .then(users => res.json(users))
    .catch(e => next(e));
}

function remove(req, res, next) {
  const user = req.user;
  user.remove()
    .then(deletedUser => res.json(deletedUser))
    .catch(e => next(e));
}

module.exports = { load, get, create, update, list, remove };
