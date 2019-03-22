class UserItem {

    //Constructor for itemCode details
constructor(itemCode, rating, watchedIt, itemName, itemCategory){
    this._itemCode = itemCode;
    this._rating = rating;
    this._watchedIt = watchedIt;
    this._itemName = itemName;
    this._itemCategory = itemCategory;
}

//Getters and Setters 
get itemCode() {
    return this._itemCode;
}

set itemCode(value) {
    this._itemCode = value;
}
get rating() {
    return this._rating;
}

set rating(value) {
    this._rating = value;
}

get watchedIt() {
    return this._watchedIt;
}

set watchedIt(value) {
    this._watchedIt = value;
}

get itemName() {
    return this._itemName;
}

set itemName(value) {
    this._itemName = value;
}

get itemCategory() {
    return this._itemCategory;
}

set itemCategory(value) {
    this._itemCategory = value;
}

}
module.exports=UserItem;