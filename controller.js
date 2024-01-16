


const {users} = require('./userdata')

const userRegistration=(req,res)=>{
    console.log(users)
    const {username,password}=req.body;
    existingUser=users.find((user)=>{
        console.log('user is', user.username)
        console.log('user passed', username)
        console.log('is true', user.username===username)
        
       return user.username===username})

    console.log('does the user exist', existingUser)
    if (existingUser){
        return res.status(400).json({error:"username already exists"});
    }

    // Hash the password (you should use bycrypt here )
    const passwordHash='HashedPassword'; // Replace with bycrypt hash

    // create a new user object 
    const newUser = { 
        id: users.length+1,
        username,
        passwordHash
    }

    users.push(newUser)

    res.status(201).json({message:"User Registered Successfully",data:{users}})
}




const userLogin=(req,res)=>{
    const {username,password}= req.body;
    const user = users.find((user)=>{
        user.username===username
    })

    if (!user){
        return res.status(401).json({error: "Invalid username or password"});
    }

    const isPasswordValid= user.passwordHash === password;

    if (!isPasswordValid){
        return res.status(401).json({error:"Invalid username or password"})
    }
    res.status(200).json({success:"Login Successful"})
}

// this is middleware to protect a route if it requries authentication
const authenticateUser = (req, res, next) => {
    const { username, password } = req.body;
  
    // Find the user with the provided username
    const user = users.find((user) => user.username === username);
  
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
  
    // Compare the provided password with the hashed password stored in user data
    const isPasswordValid = comparePassword(password, user.passwordHash);
  
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
  
    // If both username and password are valid, call next() to proceed to the next middleware or route handler
    next();
  };
  

const protectedRoutes=(req,res)=>{
    console.log('protected routes')
    res.status(200).json({message:"protected route accessed "})
}

module.exports={userRegistration,userLogin,protectedRoutes,authenticateUser}