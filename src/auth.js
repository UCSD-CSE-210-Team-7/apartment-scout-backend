import express from 'express';
import admin from './firebase.js';

const router = new express.Router();

console.log(auth)

// PREPROCESSOR FOR ALL API ROUTES
router.use('*', async (req, res, next) => {
  console.log('\n\n'+req.get('host'))
  if(req.body.admin)
    return next()

  if(req.cookies.sessionCookie){
    try{
      const sessionCookie = req.cookies.sessionCookie || '';

      const identity = await admin.auth().verifySessionCookie(sessionCookie)
      req.identity = identity

      console.log('Identity processed via cookie, continuing.')
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
      const identity = await admin.auth().verifyIdToken(req.body.credential)
      req.identity = identity

      //verify ucsd email address
      if(identity.email.substr(identity.email.lastIndexOf('@')) !== '@ucsd.edu')
        throw "invalid email address. Please try UCSD email"

      console.log('Identity processed via request body')

      const expiresIn = 60 * 60 * 24 * 1000 * 14;

      const cookie = await admin.auth().createSessionCookie(req.body.credential, {expiresIn})

      //set a session cookie
      const options = {maxAge: expiresIn, httpOnly: false, secure: false};
      res.cookie('sessionCookie', cookie, options)

      console.log('Setting session cookie')

      next()
    }
    catch(error){
      console.log(error)
      console.log(`Failed to parse identity: ${req.body}`);
      return res.status(404).send('Error: failed to parse identity')
    }
  }
})

router.get('/test', (req, res) => {
  res.status(200).send(req.identity)
})

export default router;
