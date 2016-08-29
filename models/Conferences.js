var mongoose= require('mongoose');

var ConferenceSchema = new mongoose.Schema({

	confTitle:String,
	confDesc:String,
	chairPerson:[{type:mongoose.Schema.Types.ObjectId, ref:'User'}],
	initialDeadline:{type:Date},
	finalDeadline:{type:Date}
	

});

mongoose.model('Conference',ConferenceSchema);