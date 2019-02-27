var Item= require('../models/Item');

//getItems
var getItems= function(){
    let items = [];
    for(var i=0;i<data.length;i++){
        let item = new Item(data[i].itemCode,
            data[i].itemName,
            data[i].catalogCategory,
            data[i].description,
            data[i].rating,
            data[i].imgUrl);

        items.push(item);       
    }
    return items;
};

//getItem
var getItem = function(itemCode){
    for(var i=0;i<data.length;i++){
        if(data[i].itemCode == itemCode){
            let item = new Item(data[i].itemCode,
                data[i].itemName,
                data[i].catalogCategory, 
                data[i].description,
                data[i].rating,
                data[i].imgUrl);
                return item;
        }
    }
}
//Data 
var data = [
    {
        itemCode: 1,
        itemName: "Aquaman",
        catalogCategory: "Super Hero",
        description: "Once home to the most advanced civilization on Earth, the city of Atlantis is now an underwater kingdom ruled by the power-hungry King Orm. With a vast army at his disposal, Orm plans to conquer the remaining oceanic people -- and then the surface world. Standing in his way is Aquaman, Orm's half-human, half-Atlantean brother and true heir to the throne. With help from royal counselor Vulko, Aquaman must retrieve the legendary Trident of Atlan and embrace his destiny as protector of the deep.",
        rating: 5,
        imgUrl: "../../assets/images/1.jpg",
        
    },
    {
        itemCode: 2,
        itemName: "Avengers:Infinity War",
        catalogCategory: "Super Hero",
        description: "The Avengers and their allies must be willing to sacrifice all in an attempt to defeat the powerful Thanos before his blitz of devastation and ruin puts an end to the universe.",
        rating: 4,
        imgUrl: "../../assets/images/2.jpg",
    },
    
    
    {
        itemCode: 3,
        itemName: "Black Panther",
        catalogCategory: "Super Hero",
        description: "T'Challa, heir to the hidden but advanced kingdom of Wakanda, must step forward to lead his people into a new future and must confront a challenger from his country's past.",
        rating: 4,
        imgUrl:  "../../assets/images/3.jpg",
    },
    
    
    {
        itemCode: 4,
        itemName: "Deadpool 2",
        catalogCategory: "Action-Comedy",
        description: "Foul-mouthed mutant mercenary Wade Wilson (AKA. Deadpool), brings together a team of fellow mutant rogues to protect a young boy with supernatural abilities from the brutal, time-traveling cyborg, Cable.",
        rating: 5,
        imgUrl:  "../../assets/images/4.jpg",
    },
    
    {
        itemCode: 5,
        itemName: "Game Night",
        catalogCategory: "Action-Comedy",
        description: "A group of friends who meet regularly for game nights find themselves entangled in a real-life mystery when the shady brother of one of them is seemingly kidnapped by dangerous gangsters.",
        rating: 2,
        imgUrl:  "../../assets/images/5.jpg",
    },
    
    {
        itemCode: 6,
        itemName: "Steven Universe ",
        catalogCategory: "Action-Comedy",
        description: "A team of intergalactic warriors fights to protect the universe, but the combination of three highly trained beings and one quirky young boy leaves the team struggling to overcome the dangerous scenarios that are put in front of them.",
        rating: 3,
        imgUrl:  "../../assets/images/6.jpg",
    }
];

module.exports.getItem = getItem;
module.exports.getItems = getItems;

