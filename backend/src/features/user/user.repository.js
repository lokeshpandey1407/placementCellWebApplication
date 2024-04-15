import userModel from "./user.schema.js";

export default class UserRepository {
  async signup(user) {
    return await userModel(user).save();
  }
  async findByEmail(email) {
    return await userModel.findOne({ email });
  }
}
