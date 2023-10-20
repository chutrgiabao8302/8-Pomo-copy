import mongoose from "mongoose"; 
// EMS

async function connect() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/pomodoro", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to database");
  } catch (error) {
    console.log("Error connecting to database");
  }
}

export default { connect };
