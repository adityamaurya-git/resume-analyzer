import { useContext, useEffect } from "react"
import { InterviewReportContext } from "../context/interview.context"
import { generateReport, getAllReport, getReportById } from "../services/interview.api";


export const useInterviewReport = () => {


    const context = useContext(InterviewReportContext);

    if (!context) {
        throw new Error("UseInterviewReport must be used within an interviewProvider")
    }

    const { loading, report, reports, setLoading, setReport, setReports } = context;


    const generateInterviewReport = async ({ resume, selfDescription, jobDescription }) => {
        setLoading(true);

        try {
            const response = await generateReport({ resume, selfDescription, jobDescription });
            setReport(response.interviewReport);
            return response.interviewReport;
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }

    }


    const getInterviewReportById = async (reportId) => {
        setLoading(true);

        try {
            const response = await getReportById(reportId);
            setReport(response.interviewReport);
            return response.interviewReport;

        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }

    }


    const getAllInterviewReports = async () => {
        setLoading(true);

        try {
            const response = await getAllReport();
            setReports(response.interviewReport);
            return response.interviewReport;

        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }

    }

    useEffect(() =>{
        getAllInterviewReports()
    },[])

    return {loading, report, reports, generateInterviewReport, getInterviewReportById, getAllInterviewReports}
}