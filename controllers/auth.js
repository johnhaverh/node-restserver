const {response} = require('express');

const login = async (req = request, res = response) => {

    res.json({
      msg: "Login ok",
    })
  }


module.exports = {
    login,
}