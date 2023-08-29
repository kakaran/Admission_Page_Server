const Form = require("../Models/Form");

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

        await new Form({
            Email, CETRank, CETRollNo, IPUApplicationNo, AdmitCardCopy: await CloudinaryImageUploder(AdmitCardCopy), NameStudent, StudentContacatNo, StudentAdharCardNo, StudentEmailId, DOB, FatherName, FatherOccupation, FatherEmailId, MotherName, MotherContactNo, MotherOccupation, MotherEmail, AdmissionCategory, AreaOfResidence, Gender, PermanentAddress, CorrespondenceAddress, Religion, Nationality, TenthPercentage, TwelthPercentage, StudentImage: await CloudinaryImageUploder(StudentImage), ProofOfDateOfBirthCopy: await CloudinaryImageUploder(ProofOfDateOfBirthCopy), CETRollNoCopy: await CloudinaryImageUploder(CETRollNoCopy), TenthCopy: await CloudinaryImageUploder(TenthCopy), TwelthCopy: await CloudinaryImageUploder(TwelthCopy), ProofOfAddressCopy: await CloudinaryImageUploder(ProofOfAddressCopy), ProofOfReservedCopy: await CloudinaryImageUploder(ProofOfReservedCopy)
        }).save();

        return res
            .status(200)
            .send({ message: "Form Successfully Submitted", status: true });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    FormAdd
}