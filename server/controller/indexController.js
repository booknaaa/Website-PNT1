const User = require('../model/model')



// รับข้อมูลจาก MongoDB และส่งไปยังเทมเพลต EJS
module.exports = async (req, res) => {
    
  try {

    
    const  UserData1 = await User.countDocuments();
    //const  UserData1 = await User.find({"role":"Admin"}).count();
    const  UserData2 = await User.countDocuments();
    const  UserData = await User.findById(req.session.userId);
 
   //console.log(UserData1)

    res.render('index', {  UserData,UserData1,UserData2 });
    

  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Internal Server Error');
  }
  
}

