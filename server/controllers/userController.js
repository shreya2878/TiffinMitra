import userModel from "../models/usermodel.js"

export const getUserData = async (req, res) => {
  try {
    const userId = req.user.id   // req.body se nahi lena hai
    const user = await userModel.findById(userId).select("-password")

    if (!user) {
      return res.json({ success: false, message: "User not found" })
    }

    res.json({ success: true, data: user })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}
