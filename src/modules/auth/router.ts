import { Router } from 'express';
import { auth } from '../../middleware/auth';
import {
  create,
  getMe,
  login,
  updateEmail,
  updateName,
  updatePhone
} from './controller';

const router = Router();

router
  .route('/users')
  .post(create);

router.route('/me').get(auth, getMe);

router.route('/login').post(login);

router.route('/users/name').patch(auth, updateName);
router.route('/users/phone').patch(auth, updatePhone);
router.route('/users/email').patch(auth, updateEmail);

export {router as AuthRouter};