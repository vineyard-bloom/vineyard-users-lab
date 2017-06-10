"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vineyard_users_1 = require("vineyard-users");
var UserClient = (function () {
    function UserClient(webClient) {
        this.webClient = webClient;
    }
    UserClient.prototype.prepareTwoFactor = function () {
        var _this = this;
        return this.webClient.get('user/2fa')
            .then(function (data) { return _this.webClient.post('user/2fa', {
            twoFactor: vineyard_users_1.getTwoFactorToken(data.secret)
        })
            .then(function () { return _this.twoFactorSecret = data.secret; }); });
    };
    UserClient.prototype.register = function (user) {
        var _this = this;
        this.password = user.password;
        return this.prepareTwoFactor()
            .then(function (twoFactorSecret) { return _this.webClient.post('user', user); })
            .then(function (user) { return _this.user = user; });
    };
    UserClient.prototype.login = function () {
        return this.webClient.post('user/login', {
            username: this.user.username,
            password: this.password,
            twoFactor: vineyard_users_1.getTwoFactorToken(this.twoFactorSecret)
        });
    };
    UserClient.prototype.logout = function () {
        return this.webClient.post('user/logout');
    };
    return UserClient;
}());
exports.UserClient = UserClient;
//# sourceMappingURL=user-client.js.map