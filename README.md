# Quiz-App


# API DETAILS 

1.  localhost:3000/register   
    => API to register user and admin
    => Input format in postman   :    {
                                      "name": "priyanka",
                                      "email": "priyanka@gmail.com",
                                      "phone" : "8287470139",
                                      "role": "User",
                                      "password": "priyanka123",
                                      "cpassword": "priyanka123"
                                      } 
                                      
    => All fields are mandatory to give from user
    
   
2.   localhost:3000/login    
     => API to login user/admin
     => To generate authentication token 
     => Take email and password from user/admin
     => Input formate    :   {
                              "email": "admin@gmail.com",
                              "password": "abc"
                              }
                              
                              
              
#  Protected APIs 
              
3.    localhost:3000/addquestion/:userId                  
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
                              
                              
         
4.   localhost:3000/getquestion/:userId                                
     => API to get new question in quiz 
     => Take authorization bearer token as input
     => Take userId in path params
     
     
     
5.   localhost:3000/checkquestion/:userId
     => API to check previous generated question in quiz 
     => Take authorization bearer token as input
     => Take userId in path params
     => Input formate      :     {
                                  "question": "lkdjwdoi0felsdwlk",
                                  "selectedOption": ["a","b"]
                                  }
