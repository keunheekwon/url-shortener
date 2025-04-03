import { Router } from 'express';
import { shortenUrlPost, redirectUrl } from '../controllers/url.controller';

const router = Router();

router.post('/shorten', shortenUrlPost);

router.get('/:shortenedUrl', redirectUrl);

export default router;
