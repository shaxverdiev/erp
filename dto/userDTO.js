// из аргумента model берутся указанные поля
module.exports = class UserDTO {
    constructor(model) {
      this.id = model.id;
      this.login = model.login
      this.role = model.role
    }
  };
  