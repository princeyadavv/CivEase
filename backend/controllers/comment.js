const comments = require('../models/comment')
const issues = require('../models/issue')

async function handleCommentPost(req,res){
    const {content,issueId}=req.body
    try {
        const comment = await comments.findByIdAndUpdate(
            content,
            { issue: issueId }, 
            { new: true }
        );
await issues.findByIdAndUpdate(issueId,{$addToSet: { comments: comment._id }})
return res.status(200).json({message:"comment created successfully"})

    } catch (error) {
        console.error('Error updating comment:', error);
    }
}

module.exports = {handleCommentPost}