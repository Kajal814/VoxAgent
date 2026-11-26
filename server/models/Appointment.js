import mongoose from "mongoose";

const appointmentSchema=new moongoose.Schema(
    {
        patientName: {
    type: String,
    required: true,
    trim: true,
  },
  phone:{
    type:String,
    required:true,
    trim:true,
  },

  email:{
    type:String,
    lowercase:true,
    trim:true,
  },
  appointmentDate:{
    type: Date,
    required: true, 
  },

timeSlot:{
    type:String,
    required:true,
},
reason:{
    type:String,
    trim:true,
},
status:{
    type:String,
    enum:["Booked","Cancelled","Completed"],
    default:"Booked"
},},
    {
        timestamp:true,
    }

);

const Appointment=mongoose.model(
    "Appointment", appointmentSchema
)

export default Appointment;