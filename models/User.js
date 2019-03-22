

class User {
  
    //Constructor for user details
constructor(userID, firstName, lastName, email, address1, address2, city, state, zipCode, country){
    this._userID = userID;
    this._firstName = firstName;
    this._lastName = lastName;
    this._email = email;
    this._address1 = address1;
    this._address2 = address2;
    this._city = city;
    this._state = state;
    this._zipCode = zipCode;
    this._country = country;
}

//Getters and Setters 
get userID() {
    return this._userID;
}

set userID(value) {
    this._userID = value;
}
get firstName() {
    return this._firstName;
}

set firstName(value) {
    this._firstName = value;
}

get lastName() {
    return this._lastName;
}

set lastName(value) {
    this._lastName = value;
}

get email() {
    return this._email;
}

set email(value) {
    this._email = value;
}

get address1() {
    return this._address1;
}

set address1(value) {
    this._address1 = value;
}

get address2() {
    return this._address2;
}

set address2(value) {
    this._address2 = value;
}
get city() {
    return this._city;
}

set city(value) {
    this._city = value;
}
get state() {
    return this._state;
}

set state(value) {
    this._state = value;
}
get zipCode() {
    return this._zipCode;
}

set zipCode(value) {
    this._zipCode = value;
}
get country() {
    return this._country;
}

set country(value) {
    this._country = value;
}

}
module.exports=User;
