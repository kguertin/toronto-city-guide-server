const User = require('../models/user');


exports.getUserToken = async (req, res) => {
    const user = await User.findById(req.user);
    res.json({
        username: user.username,
        id: user._id
    })
}

exports.findUser = (req, res) => {
    const { username } = req.body;
    // console.log(username)
    User.findOne({username})
    .then(user => {
        // console.log("find user route: ",user)
        res.json({
            username: user.username,
            id: user._id
        })
    })   
}

exports.addContact = (req, res) => {
    const { userData } = req.body;
    User.findById(req.user)
    .then(user => {
        user.contact.push(userData);
        user.save();
    })
    // Person.updateOne({'_id': req.user}, {'contact': {userData}});
    // User.update({'_id': req.user}, { $set: {$push : {'contact': userData}}} )
    res.json({userData})
}

// // Cast to number failed for value "bar" at path "age"
// await Person.updateOne({}, { age: 'bar' });

// // Path `age` (-1) is less than minimum allowed value (0).
// await Person.updateOne({}, { age: -1 }, { runValidators: true });


// person.friends.push(friend);
// person.save(done);


// exports.addFriend = function (req, res, next) {
//     var friend = { "firstName": req.body.fName, "lastName": req.body.lName };
//     Users.findOneAndUpdate({ name: req.user.name }, { $push: { friends: friend } });
// };


// PersonModel.update(
//     { _id: person._id }, 
//     { $push: { friends: friend } },
//     done
// );