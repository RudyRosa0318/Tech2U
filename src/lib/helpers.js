const bcrypt = require('bcryptjs');
const passes = {};

passes.encryption = async (password) => {
    const genSalt = await bcrypt.genSalt(5);
    const finalpass = await bcrypt.hash(password, genSalt);
    return finalpass;
  };
  
  passes.check = async (password, savedPassword) => {
    try {
      return await bcrypt.compare(password, savedPassword);
    } catch (e) {
      console.log(e)
    }
  };

module.exports = passes;