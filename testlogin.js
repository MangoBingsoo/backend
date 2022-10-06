const express = require('express');
const session = require('express-session');
const fileStore = require('session-file-store')(session);
const passport = require('passport')
,GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const path = require('path')
require('dotenv').config()
const app = express();
const User = require('./schemas/User')

// let db = [{
// 	id : '1',
// 	email : 'forestser00@gmail.com',
//     password : 'qlalfqjsgh?',
//     name : 'forestser00',
//     provider : '',
//     token : '',
//     providerId : ''
// }];

const googleCredentials = {
    "web": {
        "client_id": process.env.GOOGLE_OAUTH_CLIENT_ID,
        "client_secret": process.env.GOOGLE_OAUTH_PASSWORD,
        "redirect_uris": [
            "http://localhost:8006/auth/google/callback"
        ]
    }
}

app.use(express.urlencoded({extended : false}));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store : new fileStore()
}));

app.use(passport.initialize());
 
passport.serializeUser((user, done) => {
    done(null, user);
  });
passport.deserializeUser((user, done) => {
	done(null, user);
});

// passport.use(new GoogleStrategy({
//     clientID: googleCredentials.web.client_id,
//     clientSecret: googleCredentials.web.client_secret,
//     callbackURL: googleCredentials.web.redirect_uris[0]
//   },
//   (accessToken, refreshToken, profile, done) => {
//       console.log(profile);
//        let user = db.find(userInfo => userInfo.email === profile.emails[0].value);
//        if(user) {
//            user.provider = profile.provider;
//            user.providerId = profile.id;
//            user.token = accessToken;
//            user.name = profile.displayName;
//        }else {
//            user = {
//                id : 2,
//                provider : profile.provider,
//                providerId : profile.id,
//                token : accessToken,
//                name : profile.displayName,
//                email : profile.emails[0].value
//            }
//            db.push(user);
//        }
//          return done(null, user);
//   }
// ));

passport.use(new GoogleStrategy({
  clientID: googleCredentials.web.client_id,
  clientSecret: googleCredentials.web.client_secret,
  callbackURL: googleCredentials.web.redirect_uris[0]
},
async (accessToken, refreshToken, profile, done) => {
    console.log(profile);
      let user = await User.find(userInfo => userInfo.email === profile.emails[0].value);
      console.log(user);
      if(user) {
        console.log('true')
        user.provider = profile.provider;
        user.providerId = profile.id;
        user.token = accessToken;
        user.name = profile.displayName;
        user.email = profile.emails[0].value;
        console.log('true')
      } else {
        try {
          let users = new User({
            "name" : profile.displayName,
            "email" : profile.emails[0].value
          })
          
        } catch(err) {
          console.log(`2${err}`)
        }
      }
      return done(null, user);
    }
));

//구글 로그인 버튼 클릭시 구글 페이지로 이동하는 역할
app.get('/auth/google',
  passport.authenticate('google', { scope: ['email','profile'] }));


//구글 로그인 후 자신의 웹사이트로 돌아오게될 주소 (콜백 url)
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/auth/login' }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'testlogin.html'))
});


app.get('/auth/logout',(req,res,next)=>{
    req.session.destroy((err)=>{
        if(err) next(err);
        req.logOut();
        res.cookie(`connect.sid`,``,{maxAge:0});
        res.redirect('/');
    });
});

app.use((err,req,res,next)=>{
  if(err) console.log(err);
  res.send(`error : ${err}`);
});


app.listen(8006,()=>console.log('http://localhost:8006'));