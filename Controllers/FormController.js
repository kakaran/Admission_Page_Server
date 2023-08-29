const Form = require("../Models/Form");
const User = require("../Models/User")

const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
});

const CloudinaryImageUploder = async (image) => {
    const CloudinaryResponse = await cloudinary.uploader.upload(image.path, {
        resource_type: "auto",
        format: "jpg",
    });
    return CloudinaryResponse.url;
}

const FormAdd = async (req, res) => {
    try {
        const { Email, CETRank, CETRollNo, IPUApplicationNo, NameStudent, StudentContacatNo, StudentAdharCardNo, StudentEmailId, DOB, FatherName, FatherOccupation, FatherEmailId, MotherName, MotherContactNo, MotherOccupation, MotherEmail, AdmissionCategory, AreaOfResidence, Gender, PermanentAddress, CorrespondenceAddress, Religion, Nationality, TenthPercentage, TwelthPercentage, } = req.fields;

        const { AdmitCardCopy, ProofOfDateOfBirthCopy, CETRollNoCopy, TenthCopy, TwelthCopy, ProofOfAddressCopy, ProofOfReservedCopy, StudentImage } = req.files;
        const { _id } = req.user

        if (!NameStudent || !CETRank || !Email || !CETRollNo || !IPUApplicationNo || !AdmitCardCopy || !StudentContacatNo || !!StudentAdharCardNo || !StudentEmailId || !DOB || !FatherName || !FatherOccupation || !MotherName || !MotherContactNo || !MotherOccupation || !AdmissionCategory || !AreaOfResidence || !Gender || !PermanentAddress || !CorrespondenceAddress || !Religion || !Nationality || !TenthPercentage || !TwelthPercentage || !StudentImage || !ProofOfDateOfBirthCopy || !CETRollNoCopy || !TenthCopy || !TwelthCopy || !ProofOfAddressCopy || !ProofOfReservedCopy) {
            return res.status(500).send({
                message: "Kindly please fill all information...",
                status: false,
            });
        }

        if (AdmitCardCopy.size > 1000000) return res
            .status(500)
            .send({ message: "Admit card image size larger then 1Mb", status: false });

        if (ProofOfDateOfBirthCopy.size > 1000000) return res
            .status(500)
            .send({ message: "Proof of Date of Birth image size larger then 1Mb", status: false });

        if (CETRollNoCopy.size > 1000000) return res
            .status(500)
            .send({ message: "CET roll no image size larger then 1Mb", status: false });

        if (TenthCopy.size > 1000000) return res
            .status(500)
            .send({ message: "Tenth Marksheet image size larger then 1Mb", status: false });

        if (TwelthCopy.size > 1000000) return res
            .status(500)
            .send({ message: "Twelth Marksheet image size larger then 1Mb", status: false });

        if (ProofOfAddressCopy.size > 1000000) return res
            .status(500)
            .send({ message: "Proof of address image size larger then 1Mb", status: false });

        if (ProofOfReservedCopy.size > 1000000) return res
            .status(500)
            .send({ message: "Proof Of ReservedCopy category image size larger then 1Mb", status: false });

        if (StudentImage.size > 1000000) return res
            .status(500)
            .send({ message: "Student image size larger then 1Mb", status: false });


        const FormCheck = await Form.findOne({ Email: Email }, { Email: 1 });

        if (FormCheck) return res
            .status(500)
            .send({ message: "Form user allready submitted", status: false });

        const Formcreated = await new Form({
            Email, CETRank, CETRollNo, IPUApplicationNo, AdmitCardCopy: await CloudinaryImageUploder(AdmitCardCopy), NameStudent, StudentContacatNo, StudentAdharCardNo, StudentEmailId, DOB, FatherName, FatherOccupation, FatherEmailId, MotherName, MotherContactNo, MotherOccupation, MotherEmail, AdmissionCategory, AreaOfResidence, Gender, PermanentAddress, CorrespondenceAddress, Religion, Nationality, TenthPercentage, TwelthPercentage, StudentImage: await CloudinaryImageUploder(StudentImage), ProofOfDateOfBirthCopy: await CloudinaryImageUploder(ProofOfDateOfBirthCopy), CETRollNoCopy: await CloudinaryImageUploder(CETRollNoCopy), TenthCopy: await CloudinaryImageUploder(TenthCopy), TwelthCopy: await CloudinaryImageUploder(TwelthCopy), ProofOfAddressCopy: await CloudinaryImageUploder(ProofOfAddressCopy), ProofOfReservedCopy: await CloudinaryImageUploder(ProofOfReservedCopy)
        }).save();

        await User.findByIdAndUpdate({ _id }, { FormId: Formcreated._id }, {
            new: true,
        })

        return res
            .status(200)
            .send({ message: "Form Successfully Submitted", status: true });
    } catch (error) {
        console.log(error);
    }
}

const FormDisplay = async (req, res) => {
    try {
        const FormData = await Form.find();

        if (FormData) return res.status(200).send({ message: "Data Send", status: true, FormData })
        else return res.status(401).send({ message: "Data not found", status: false, })
    } catch (error) {
        console.log(error);
    }
}

const StrudentFormDisplay = async (req, res) => {
    try {
        const { _id } = req.user;

        const DataGet = await User.findById({ _id }).populate("FormId", "Email NameStudent StudentContacatNo DOB FatherName MotherName createdAt")

        if (DataGet) return res.status(200).send({ message: "Data send", status: true, DataGet })
        else return res.status(401).send({ message: "Data not get", status: false })
    } catch (err) {
        console.log(err);
    }
}




module.exports = {
    FormAdd,
    FormDisplay,
    StrudentFormDisplay
}