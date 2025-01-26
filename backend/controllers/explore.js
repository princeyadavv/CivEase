const issues = require('../models/issue');

async function showAllIssues(req, res) {
    try {
        const aggregatedIssues = await issues.aggregate([
            {
                $addFields: {
                    supportLength: { $size: "$support" }
                }
            },
            {
                $sort: { supportLength: -1, createdAt: -1 }
            }
        ]);

        const populatedIssues = await issues.populate(aggregatedIssues, { path: 'createdBy' });

        return res.json({ issue: populatedIssues });
    } catch (error) {
        console.error('Error fetching issues:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function ShowParticularIssue(req, res) {
    try {
        const id = req.params.id;

        const issue = await issues.findById(id).populate('createdBy'); 

        if (!issue) {
            return res.status(404).json({ error: 'Issue not found' });
        }

        return res.json({ issue });
    } catch (error) {
        console.error('Error fetching the issue:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { showAllIssues,ShowParticularIssue };
