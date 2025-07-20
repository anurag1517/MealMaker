import { ReqBody } from "../types";
import { detectSeason } from "../utils/season";
import { callLLM } from "../utils/llm"; // This function will use OpenAI/Gemini/etc.

export async function recommend(b: ReqBody) {
  const [latStr] = b.location.split(",");
  const lat = parseFloat(latStr) || 0;
  const season = detectSeason(lat, new Date().getMonth());
  const prompt = `

Aap ek Hinglish meal recommendation AI ho — aap Hindi + English (Hinglish) mein baat karte ho jaise aam zindagi mein log karte hain.

Niche user ka context diya gaya hai:

Neeche user ka context diya gaya hai:

- Preference (veg/nonveg): ${b.pref}
- Health conditions: ${b.issues.length ? b.issues.join(", ") : "None"}
- Location: ${b.location}
- Meal type: ${b.mealType}
- Current season: ${season}

Aapka task hai user ke liye 4-6 complete meal combinations batana (jaise “Roti + Dal + Bhindi Sabzi + Salad” ya “Rice + Sambar + Curd + Beetroot Poriyal”) — aap ensure karo ki har suggestion main staple (roti/rice), ek veg sabzi/main, thoda protein (dal, paneer, dahi), aur salad ya chutney ya curd ho (yaa region ke hisaab se).

Har suggestion mein:

- Meal ka poora naam (all items together, e.g., "2 Chapati + Lauki Sabzi + Moong Dal + Salad + Dahi")
- Short explanation in Hinglish kyun yeh meal health aur unke conditions ke liye accha hai (e.g., “Is meal mein high fiber aur protein hai, jo diabetes control mein madad karta hai.”)

Sab kuch Hinglish mein ho, sirf numbered list mein, extra formatting mat do.

Example:
1. 2 Roti + Matar Paneer + Masoor Dal + Cucumber Salad + Dahi – Is combo mein fiber, protein aur probiotics ka balance hai, jo digestion aur diabetes ke liye accha hai.
2. ...

Portion control aur user ke health issues ke hisaab se meals recommend karo.`
.trim();


  const foods = await callLLM(prompt); // returns plain string or parsed array

  return { season, foods };
}
