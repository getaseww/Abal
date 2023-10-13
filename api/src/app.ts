import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import passport from "passport";
import { localStrategy, jwtStrategy } from './passport/passport.config'
import expressSession from 'express-session'
import cors from 'cors'
import path from 'path'
import routes from './routes';
dotenv.config();
import db from './config/db';

const app: Application = express();

app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ limit: '25mb' }));
app.use(expressSession
    ({
        secret: process.env.SESSION_KEY,
        resave: true,
        saveUninitialized: true,
    })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(localStrategy);

passport.use(jwtStrategy);
passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (user, done) {
    done(null, user);
});




app.use(cors())
app.use('/images', express.static(path.join(__dirname, "images")));
db();


routes(app);


app.listen(process.env.PORT || 8000, () => {
    console.log("backend is running on port " + process.env.PORT);
})
