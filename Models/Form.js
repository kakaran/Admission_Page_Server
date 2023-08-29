const mongoose = require('mongoose');

const FormSchema = mongoose.Schema({
    Email: { type: String, required: true, unique: true },
    CETRank: { type: String, required: true },
    CETRollNo: { type: Number, required: true },
    IPUApplicationNo: { type: String, required: true },
    AdmitCardCopy: { type: String, required: true },
    NameStudent: { type: String, required: true },
    StudentContacatNo: { type: Number, required: true },
    StudentAdharCardNo: { type: String, required: true },
    DOB: { type: String, required: true },
    FatherName: { type: String, required: true },
    FatherOccupation: { type: String, required: true },
    FatherEmailId: { type: String, },
    MotherName: { type: String, required: true },
    MotherContactNo: { type: Number, required: true },
    MotherOccupation: { type: String, required: true },
    MotherEmail: { type: String, },
    AdmissionCategory: { type: String, required: true, enum: ["General", "General (Out Side Delhi)", "SC", "SC (Out Side Delhi)", "ST", "OBC", "PH", 'Other'] },
    AreaOfResidence: { type: String, required: true, enum: ["Rural", "Urban"] },
    Gender: { type: String, required: true, enum: ["Male", "Female"] },
    PermanentAddress: { type: String, required: true },
    CorrespondenceAddress: { type: String, required: true },
    Religion: { type: String, required: true },
    Nationality: { type: String, required: true },
    TenthPercentage: { type: Number, required: true },
    TwelthPercentage: { type: Number, required: true },
    StudentImage: { type: String, required: true },
    ProofOfDateOfBirthCopy: { type: String, required: true },
    CETRollNoCopy: { type: String, required: true },
    TenthCopy: { type: String, required: true },
    TwelthCopy: { type: String, required: true },
    ProofOfAddressCopy: { type: String, required: true },
    ProofOfReservedCopy: { type: String }

},
    {
        timestamps: true,
    });

const Form = mongoose.model("Form", FormSchema);

module.exports = Form