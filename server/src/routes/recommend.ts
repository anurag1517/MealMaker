import {Router} from"express";
import {handleRecommend} from"../controllers/recommend";

const router = Router();

router.post("/",handleRecommend);

export default router;
