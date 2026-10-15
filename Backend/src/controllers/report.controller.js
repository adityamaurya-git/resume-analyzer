const reportModel = require('../models/report.model');
const pdfParse = require('pdf-parse');
const generateInterviewReport = require('../services/ai.service');


/**
 * @name generateReport
 * @description to generate the interview report based on self description, job description, and resume
 * @access private
 */

const generateReport = async (req, res) => {

    const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()
    const { selfDescription, jobDescription } = req.body;

    try {
        const interviewReportByAI = await generateInterviewReport({
            resume: resumeContent.text,
            selfDescription,
            jobDescription
        });

        const interviewReport = await reportModel.create({
            user: req.user.id,
            resume: resumeContent.text,
            selfDescription,
            jobDescription,
            ...interviewReportByAI
        })

        res.status(201).json({
            message: "Interview Report Generated Successfully.",
            interviewReport
        })
    } catch (err) {
        console.log(err);
    }


}


/**
 * @name getReportById
 * @description it will fetch the report by report Id
 * @access private
 */

const getReportById = async (req, res) => {

    const {reportId} = req.params;

    try{

        const interviewReport = await reportModel.findOne({
            _id:reportId,
            user:req.user.id
        })

        if(!interviewReport){
            return res.status(404).json({
                message:"Interview report not found."
            })
        }

        res.status(200).json({
            message:"Interview report fetched successfully.",
            interviewReport
        })

    }catch(err){
        console.log(err);
    }

}


/**
 * @name getAllReport
 * @description it will fetch all the report of the user
 * @access private
 */

const getAllReport = async (req, res) => {

    try{

        const interviewReport = await reportModel.find({
            user:req.user.id
        }).sort({
            createdAt:-1
        }).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGap -preparationPlan " )

        if(!interviewReport){
            return res.status(404).json({
                message:"Interview report not found."
            })
        }

        res.status(200).json({
            message:"Interview reports fetched successfully.",
            interviewReport
        })

    }catch(err){
        console.log(err);
    }

}

module.exports = {
    generateReport,
    getReportById,
    getAllReport
}