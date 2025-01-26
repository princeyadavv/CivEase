const issues = require('../models/issue');
const mongoose = require('mongoose')
const users = require('../models/user');
const issues = require('../models/issue');

async function handleUpload(req, res) {
    const {  description, type, long, lat,location } = req.body;
    const user = req.user
    const objectId = new mongoose.Types.ObjectId(user.id);
    try {
        const imgPath = req.file.path; 
      const issue =  await issues.create({
                description,
                type,
                location,
                coordinates: `${lat},${long}`,
                img: imgPath, 
                createdBy: objectId, 
            });
            await users.findByIdAndUpdate(user._id,{
                $addToSet: { support: issue._id }
            })
            await users.updateMany({role:"ADMIN"},{
                $addToSet: { issueGiven: issue._id } 

                })
            return res.status(200).json({ message: "Issue created successfully!" });

    } catch (error) {
        console.error('Error in issue upload:', error);
        return res.status(500).json({ message: "Server Error" });
    }
}

async function handleSupport(req,res){

        try {
            const id = req.params.id;
            const currentuser = req.user;
            const { suppport } = req.body;
    
    
            const issue = await issues.findById(id);
    
    
            if (!issue) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            if (suppport) {
                await issues.findByIdAndUpdate(id, {
                    $addToSet: { support: currentuser._id } 
                });
    
                await users.findByIdAndUpdate(currentuser._id, {
                    $addToSet: { support: issue._id }
                });
            } else {
                // Unlike the target user
                await issues.findByIdAndUpdate(id, {
                    $pull: { support: currentuser._id } // Remove from likes
                });
    
                await users.findByIdAndUpdate(currentuser._id, {
                    $pull: { support: issue._id }
                });
            }
    
    
            const updatedissue = await issues.findById(id);
            res.status(200).json({ newsupportcount: updatedissue.support.length });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }

    
    
}

module.exports = { handleUpload ,handleSupport};
