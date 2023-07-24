const User = require('../model/model')

// รับข้อมูลจาก MongoDB และส่งไปยังเทมเพลต EJS
module.exports = async (req, res) => {
    
  try {

    
    const  UserData1 = await User.countDocuments({"role":"Admin"});
    //const  UserData1 = await User.find({"role":"Admin"}).count();
    const  UserData2 = await User.countDocuments();
    const  UserData = await User.findById(req.session.userId);

   console.log(UserData._id)

    res.render('Admin', {  UserData,UserData1,UserData2 });
    

  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Internal Server Error');
  }
  
}

