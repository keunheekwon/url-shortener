import { Router } from 'express';
import { shortenUrlPost, redirectUrl } from '../controllers/url.controller';
import { checkAuth } from '../middleware/auth.middleware';

const router = Router();

// URL 단축 API에 인증 미들웨어 추가
router.post('/shorten', checkAuth, shortenUrlPost);

// 리다이렉트는 모든 사용자가 접근 가능
router.get('/:shortenedUrl', redirectUrl);

export default router;
