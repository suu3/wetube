import passport from "passport";
import GithubStrategy from "passport-github";
import KakaoStrategy from "passport-kakao";
import User from "./models/User";
import { githubLoginCallback,
        kakaoLoginCallback
       } from "./controllers/userController";
import routes from "./routes";

passport.use(User.createStrategy());

//github
passport.use(
    new GithubStrategy(
        {
          clientID: process.env.GH_ID,
          clientSecret: process.env.GH_SECRET,
          callbackURL: `http://localhost:4000${routes.githubCallback}`
        },
        githubLoginCallback
    )
);

passport.use(
  new KakaoStrategy(
      {
        clientID: process.env.KK_SECRET,
        callbackURL: `http://localhost:4000${routes.kakaoCallback}`
      },
      kakaoLoginCallback
  )
);


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());