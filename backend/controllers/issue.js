const issues = require('../models/issue');
const mongoose = require('mongoose');
const users = require('../models/user');

async function handleUpload(req, res) {
    console.log('File:', req.file); // Debugging: Log the uploaded file
    console.log('Body:', req.body); // Debugging: Log the request body

    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded. Please provide a file." });
    }

    const { description, type, long, lat, location } = req.body;
    const user = req.user; // Assuming req.user is populated by middleware
    if (!user || !user.id) {
        return res.status(401).json({ message: "Unauthorized. User information is missing." });
    }

    const objectId = new mongoose.Types.ObjectId(user.id);

    try {
        const imgPath = req.file.path;

        const issue = await issues.create({
            description,
            type,
            location,
            coordinates: `${lat},${long}`,
            img: imgPath,
            createdBy: objectId,
        });

        await users.findByIdAndUpdate(user._id, {
            $addToSet: { support: issue._id }
        });

        await users.updateMany({ role: "ADMIN" }, {
            $addToSet: { issueGiven: issue._id }
        });

        return res.status(200).json({ message: "Issue created successfully!" });
    } catch (error) {
        console.error('Error in issue upload:', error);
        return res.status(500).json({ message: "Server Error" });
    }
}

async function handleSupport(req, res) {
    try {
        const id = req.params.id;
        const currentUser = req.user;
        const { support } = req.body;

        const issue = await issues.findById(id);

        if (!issue) {
            return res.status(404).json({ message: 'Issue not found' });
        }

        if (support) {
            await issues.findByIdAndUpdate(id, {
                $addToSet: { support: currentUser._id }
            });

            await users.findByIdAndUpdate(currentUser._id, {
                $addToSet: { support: issue._id }
            });
        } else {
            await issues.findByIdAndUpdate(id, {
                $pull: { support: currentUser._id }
            });

            await users.findByIdAndUpdate(currentUser._id, {
                $pull: { support: issue._id }
            });
        }

        const updatedIssue = await issues.findById(id);
        res.status(200).json({ newsupportcount: updatedIssue.support.length });
    } catch (error) {
        console.error('Error in handling support:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = { handleUpload, handleSupport };
