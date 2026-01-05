const User = require('./User');

class AdminUser extends User{
    jakaZnizka(){
        return 0;
    }
}

module.exports = AdminUser;