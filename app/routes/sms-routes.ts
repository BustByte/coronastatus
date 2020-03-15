import express, { Request } from 'express';
import { loginPinIssuer } from '../sms/loginPinIssuer';

const router = express.Router();

function determineRemoteAddress(req: Request) {
  const ipWithPort =
    (req.headers['x-forwarded-for'] as string) || req.connection.remoteAddress;
  if (ipWithPort) {
    const [ipWithoutPort] = ipWithPort.split(':');
    return ipWithoutPort;
  }
  return req.ip;
}

router.get('/', (req, res) => {
  console.log(req.query);
  const phoneNumber = req.query['nummer'];
  res.locals.metaDescription = 'Verifiser ditt telefonnummer';
  if (!phoneNumber) {
    return res.redirect('/');
  }
  return res.render('pages/sms', {
    phoneNumber,
    invalidVerificationCode: false
  });
});

router.post('/', async (req, res) => {
  const verificationCode = req.body['verification-code'];
  const phoneNumber = req.body['phone-number'];
  const ip = determineRemoteAddress(req);

  // TODO: check if verification code is invalid
  const validationSucceeded = await loginPinIssuer.validate(
    ip,
    phoneNumber,
    verificationCode
  );
  if (!validationSucceeded) {
    return res.render('pages/sms', {
      phoneNumber,
      invalidVerificationCode: true
    });
  }

  // TODO: Save verification ok

  return res.redirect('/?success=true');
});

router.get('/elements', (req, res) => {
  return res.render('pages/elements');
});

export default router;
