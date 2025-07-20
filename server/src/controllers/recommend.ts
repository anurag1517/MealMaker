import { Request, Response } from "express";
import { z } from "zod";
import { recommend } from "../utils/recommender";

const BodySchema = z.object({
  pref: z.enum(["veg", "nonveg"]),
  issues: z.array(z.string()).default([]),
  location: z.string(),
  mealType: z.enum(["breakfast", "lunch", "snacks", "dinner"]),
});

export async function handleRecommend(req: Request, res: Response) {
  const parse = BodySchema.safeParse(req.body);
  if (!parse.success)
    return res.status(400).json({ error: parse.error.issues });

  const b = parse.data;

  try {
    const { foods, season } = await recommend(b); // now handles season inside
    res.json({ season, foods });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server" });
  }
}
