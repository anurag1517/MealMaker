import {Schema,model} from"mongoose"
const FoodSchema=new Schema({
  name:{type:String,required:true},
  veg:{type:Boolean,required:true},
  mealTypes:[String],
  seasons:[String],
  goodFor:[String],
  avoidFor:[String],
  regions:[String],
  macros:{
    cal:Number,protein:Number,fat:Number,carb:Number
  }
})
export default model("Food",FoodSchema)
