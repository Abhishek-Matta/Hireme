var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

const projectSchema = new Schema({
    title: {type: String, required: true, unique: true},
    description: {type: String, required: true},
    // file: {type: file },
    skills: [String],
    budget:{type:Number, required:true},
    userid:{type:String}
});

projectSchema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('project', projectSchema, 'projects');