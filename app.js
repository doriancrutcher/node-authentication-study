const {userRegistration,userLogin,protectedRoutes, authenticateUser,}=require('./controller')
const express= require('express');
const app=express();
const port = 3000;

app.use(express.json())


// Registration Route
app.post('/register',userRegistration);

//  Login Route
app.post('/login',userLogin);


// Protected Routes
app.get('/protected',authenticateUser,protectedRoutes);



// Starting Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });