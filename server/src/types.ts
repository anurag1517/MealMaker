export type ReqBody={
  pref:"veg"|"nonveg"
  issues:string[]
  location:string       // city or "lat,lng"
  mealType:"breakfast"|"lunch"|"snacks"|"dinner"
}
export type FoodDoc={
  name:string
  veg:boolean
  mealTypes:string[]
  seasons:string[]
  goodFor:string[]
  avoidFor:string[]
  regions:string[]
  macros:{cal:number,protein:number,fat:number,carb:number}
}
