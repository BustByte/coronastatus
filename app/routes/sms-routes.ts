import express, { Request } from 'express';
import { loginPinIssuer } from '../sms/loginPinIssuer';
import { CovidReportRepository } from '../repository/CovidReportRepository';

const router = express.Router();
const reportRepo = new CovidReportRepository();

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
  const verificationCode: string = req.body['verification-code'];
  const phoneNumber: string = req.body['phone-number'];
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
  await reportRepo.saveVerificationSucceededForPhoneNumber(phoneNumber);
  return res.redirect('/?success=true');
});

router.get('/elements', (req, res) => {
  return res.render('pages/elements');
});

export default router;
