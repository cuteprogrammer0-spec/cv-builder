import React, { createContext, useState } from 'react';

export const CVContext = createContext();

export const CVProvider = ({ children }) => {
    const [cvData, setCvData] = useState({
        // Primary Information (Top Section)
        personalInfo: {
            fullName: "MD. MAHDI HASAN",
            contactMobile: "01908704",
            email: "@gmail.com",
            profilePic: null, 
        },
        
        objective: "To develop successful career in a responsible position at a well-structured organization and successfully apply acquired educational and interpersonal skill to enhance organization efficiencies.",
        
        profile: "I am a hard working person and always look for the best outcome in my assigned work. I want proper implementation of my own ideas and thoughts. I want to move forward with greater responsibilities and creativity.",
        
        education: [
            { 
                id: 1, 
                examTitle: "Higher Secondary Certificate (HSC)", 
                instName: "", 
                board: "", 
                group: "", 
                result: "", 
                passingYear: "" 
            },
            { 
                id: 2, 
                examTitle: "Secondary School Certificate Examination (SSC)", 
                instName: "", 
                board: "", 
                group: "", 
                result: "", 
                passingYear: "" 
            }
        ],

        skills: ["MS Office (Word, Excel, PowerPoint)", "Adobe Photoshop", "Junior Web Development (HTML, CSS, JavaScript)"],
        experience: ["Professional Visa Processing & Agency Operation."],
        languages: ["Bangla", "English (Basic)"],
        strengths: ["Performing better under pressure", "Friendly", "Working better in a team", "Quick learner"],
        
        // Detailed Personal Information (Bottom Section)
        personalDetails: {
            fatherName: "",
            motherName: "",
            presentAddress: "Vill- , P.O- , Upazila- , Dist- ",
            permanentAddress: "Vill- , P.O- , Upazila-, Dist-",
            placeOfBirth: "",
            religion: "",
            dateOfBirth: "",
            nationality: "",
            height: "",
            weight: "",
            bloodGroup: "",
            sex: "",
            marriageStatus: "",
            nid: ""
        }
    });

    // --- Actions / Handlers ---

    const updatePersonalInfo = (info) => {
        setCvData((prev) => ({
            ...prev,
            personalInfo: { ...prev.personalInfo, ...info }
        }));
    };

    const updatePersonalDetails = (field, value) => {
        setCvData(prev => ({
            ...prev,
            personalDetails: { ...prev.personalDetails, [field]: value }
        }));
    };

    const addEducation = () => {
        const newEdu = { id: Date.now(), examTitle: "", instName: "", board: "", group: "", result: "", passingYear: "" };
        setCvData(prev => ({ ...prev, education: [...prev.education, newEdu] }));
    };

    const removeEducation = (id) => {
        setCvData(prev => ({ ...prev, education: prev.education.filter(edu => edu.id !== id) }));
    };

    const handleEduChange = (id, field, value) => {
        const updatedEdu = cvData.education.map(edu => edu.id === id ? { ...edu, [field]: value } : edu);
        setCvData(prev => ({ ...prev, education: updatedEdu }));
    };

    const addListItem = (field) => {
        setCvData(prev => ({ ...prev, [field]: [...prev[field], ""] }));
    };

    const removeListItem = (field, index) => {
        const newList = cvData[field].filter((_, i) => i !== index);
        setCvData(prev => ({ ...prev, [field]: newList }));
    };

    const handleListChange = (field, index, value) => {
        const newList = [...cvData[field]];
        newList[index] = value;
        setCvData(prev => ({ ...prev, [field]: newList }));
    };

    return (
        <CVContext.Provider value={{ 
            cvData, setCvData, updatePersonalInfo, updatePersonalDetails,
            addEducation, removeEducation, handleEduChange,
            addListItem, removeListItem, handleListChange
        }}>
            {children}
        </CVContext.Provider>
    );
};