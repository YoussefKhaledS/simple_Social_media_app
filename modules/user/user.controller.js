import User from "../../DB/models/user.js";

export async function getAllUsers(req, res) {
  try {
    res.json(await User.findAll()) ;
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error__message: error.message,
    });
  }
}

export async function getUserById(req, res) {
  try {
    
    const {id} = req.params ;
    
    res.json(await User.findByPk(id));
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error__message: error.message,
    });
  }
}
