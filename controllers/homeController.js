const User = require('../models/user');
const Job = require('../models/job');

module.exports.home = async function(req,res)
{
    try
    {
        let jobs = await Job.find({})
                    .populate('user');

        return res.render('home', {
            title : 'WorkForce | Home',
            jobs : jobs,
        });   
    }
    catch(err)
    {
        console.log('There is an error ', err);
        return;
    }
}