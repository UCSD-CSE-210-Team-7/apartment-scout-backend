const express = require('express');
const admin = require('./utils/firebase.js');

const dal = require('./data_access')

const authMiddlewareRouter = new express.Router();

const EXPIRES_IN = 60 * 60 * 24 * 1000 * 14;

async function verifyIdentity({ sessionCookie, authorization }){
    if(sessionCookie){
        const identity = await admin.auth().verifySessionCookie(sessionCookie)
        // const user = await dal.user.getUserDetails(identity.email)
        return { identity: identity.email }
    }
    else {
        const identity = await admin.auth().verifyIdToken(authorization)
        // const user = await dal.user.getUserDetails(identity.email)

        const sessionCookie = await admin.auth().createSessionCookie(authorization, {expiresIn: EXPIRES_IN})
        return { identity: identity.email, sessionCookie }
    }
}

// PREPROCESSOR FOR ALL API ROUTES
authMiddlewareRouter.post('/', async (req, res, next) => {
    if(req.headers.admin){
        console.log(`admin user...`)
        return next()
    }

    try {
        const { identity, sessionCookie } = await verifyIdentity({ 
            sessionCookie: req.cookies.sessionCookie || undefined, 
            authorization: req.headers.authorization || req.headers.Authorization,
        })

        req.identity = identity.email
        if(sessionCookie){
            const expiresIn = 60 * 60 * 24 * 1000 * 14;
            const options = {maxAge: EXPIRES_IN, httpOnly: false, secure: false};
            res.cookie('sessionCookie', sessionCookie, options)
        }

        console.log(`identity verified, continuing...`)
        next()
    }
    catch(error){
        console.log(error)
        console.log(`Failed to verify identity`)
        res.clearCookie('sessionCookie')
        return res.status(404).send('Error: verify identity')
    }

    /*
    if(req.cookies.sessionCookie){
        try{
            const sessionCookie = req.cookies.sessionCookie || '';

            const identity = await admin.auth().verifySessionCookie(sessionCookie)
            req.identity = identity
            next()
        }
        catch(error){
            console.log(`Failed to verify identity by cookie: ${req.cookies}`);
            res.clearCookie('sessionCookie')
            return res.status(404).send('Error: verify identity by cookie')
        }
    }
    else {
        //verify identity
        try{
            const authorization = req.headers.authorization || req.headers.Authorization;
            const identity = await admin.auth().verifyIdToken(authorization)
            req.identity = identity

            const expiresIn = 60 * 60 * 24 * 1000 * 14;

            const cookie = await admin.auth().createSessionCookie(authorization, {expiresIn})

            const options = {maxAge: expiresIn, httpOnly: false, secure: false};
            res.cookie('sessionCookie', cookie, options)

            next()
        }
        catch(error){
            console.log(error)
            console.log(`Failed to parse identity: ${req.body}`);
            return res.status(404).send('Error: failed to parse identity')
        }
    }
    */
})

authMiddlewareRouter.get('/test', (req, res) => {
    res.status(200).send(req.identity)
})

module.exports = {
    verifyIdentity,
    authMiddlewareRouter
}
