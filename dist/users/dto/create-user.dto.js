"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserDto = void 0;
const class_validator_1 = require("class-validator");
var Seniority;
(function (Seniority) {
    Seniority["Junior"] = "Junior";
    Seniority["Pleno"] = "Pleno";
    Seniority["S\u00EAnior"] = "S\u00EAnior";
})(Seniority || (Seniority = {}));
var Specialties;
(function (Specialties) {
    Specialties["Desing"] = "Desing";
    Specialties["DesenvolvimentoDeSoftware"] = "Desenvolvimento de Software";
    Specialties["Marketing"] = "Marketing";
    Specialties["Vendas"] = "Vendas";
})(Specialties || (Specialties = {}));
class CreateUserDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "linkedIn", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateUserDto.prototype, "isMentor", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "about", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "workplace", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "job", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)(prop => prop.isMentor === true),
    (0, class_validator_1.IsEnum)(Specialties),
    __metadata("design:type", String)
], CreateUserDto.prototype, "specialties", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)(prop => prop.isMentor === true),
    (0, class_validator_1.IsEnum)(Seniority),
    __metadata("design:type", String)
], CreateUserDto.prototype, "seniority", void 0);
__decorate([
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateUserDto.prototype, "skillsOrInterests", void 0);
exports.CreateUserDto = CreateUserDto;
//# sourceMappingURL=create-user.dto.js.map