# Quiz-App

# github link   :   https://github.com/pathakradhika02/Quiz-App.git

# API DETAILS 

1.  localhost:5000/register   
    => API to register user and admin
    => Input format in postman   :    {
                                      "name": "Radhika",
                                      "email": "radhika@gmail.com",
                                      "phone" : "7868787878",
                                      "role": "User",
                                      "password": "radhika123",
                                      "cpassword": "radhika123"
                                      } 
                                      
    => All fields are mandatory to give from user
    
   
2.   localhost:5000/login    
     => API to login user/admin
     => To generate authentication token 
     => Take email and password from user/admin
     => Input formate    :   {
                              "email": "admin@gmail.com",
                              "password": "abc"
                              }
                              
                              
              
#  Protected APIs 
              
3.    localhost:5000/addquestion/:userId                  
      => API to add new question in database
      => Take authorization bearer token and question details as input
      => Take userId in path params
      => Input formate   :    {
                                  "question": "question",
                                  "option1": "a",
                                  "option2": "b",
                                  "option3": "c",
                                  "option4": "d",
                                  "rightOption":["a"],       // must be in array
                                  "difficulty" : 1           // 0 to 10
                              }
                              
                              
         
4.   localhost:5000/getquestion/:userId                                
     => API to get new question in quiz 
     => Take authorization bearer token as input
     => Take userId in path params
     
     
     
5.   localhost:5000/checkquestion/:userId
     => API to check previous generated question in quiz 
     => Take authorization bearer token as input
     => Take userId in path params
     => Input formate      :     {
                                  "question": "lkdjwdoi0felsdwlk",
                                  "selectedOption": ["a","b"]
                                  }
