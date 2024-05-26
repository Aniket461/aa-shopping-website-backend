const userSchema = new mongoose.Schema({ 
    name: { 
        type: String, 
        required: true
    }, 
    role: { 
        type: String, 
        required: true
    }, 
    email: { 
        type: String, 
        required: true
    }, 
    password: { 
        type: String, 
        required: true
    }, 
    address: { 
        type: String, 
        required: true
    }, 
    
}) 
  
const User = new mongoose.model("User", userSchema)