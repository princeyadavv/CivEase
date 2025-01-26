const issues = require('../models/issue');
const jwt = require('jsonwebtoken')

async function handleUpload(req, res) {
    const {  description, type, long, lat,location } = req.body;
    const user = jwt.decode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.Kj5JjhR7QJcRSHZs_wv98L9KAX1axQaRjw0xbMJR_vM");
    try {

        await issues.create({
                description,
                type,
                location,
                coordinates: `${lat},${long}`,
                img: imgPath, 
                createdBy: user._id
            });

            return res.status(200).json({ message: "Issue created successfully!" });

    } catch (error) {
        console.error('Error in issue upload:', error);
        return res.status(500).json({ message: "Server Error" });
    }
}



module.exports = { handleUpload };
