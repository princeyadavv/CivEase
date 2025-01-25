const mongoose = require('mongoose')
const commentSchema = mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    issue:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'issue'
    }
})
const comment = mongoose.model('comment',commentSchema)
module.exports = comment