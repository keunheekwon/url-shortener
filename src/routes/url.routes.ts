import { Router } from 'express';
import { shortenUrlPost, redirectUrl } from '../controllers/url.controller';

const router = Router();

// URL 단축 API (POST 요청)
router.post('/shorten', shortenUrlPost);

// 단축된 URL 리다이렉트
router.get('/:shortenedUrl', redirectUrl);

export default router;
