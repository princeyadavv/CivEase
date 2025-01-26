const mongoose = require('mongoose')
const issueSchema = mongoose.Schema({
location:{
    type:String,
    // required:"true"
},
coordinates:{
    type:String,
    // required:"true"
},
img:{
    type:String,
    // required:true

},
description:{
    type:String,
    // required:true
},
status:{
    type:String,
    default: "UNDER REVIEW"
},
support:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
],
comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'comment',
    },
  ]
,
createdBy:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'user'
},
authority:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'user'
}
},{ timestamps: true })

const issue = mongoose.model('issue',issueSchema)
module.exports = issue