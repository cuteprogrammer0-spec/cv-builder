import React, { useContext } from 'react';
import { CVContext } from '../context/CVContext';

const FormSection = () => {
    const { 
        cvData, 
        updatePersonalInfo, 
        updatePersonalDetails, 
        setCvData, 
        addEducation, 
        removeEducation, 
        handleEduChange,
        addListItem,
        removeListItem,
        handleListChange
    } = useContext(CVContext);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                updatePersonalInfo({ profilePic: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    // লিস্ট সেকশন রেন্ডারার (Skills, Experience, ইত্যাদি)
    const renderListInput = (title, field, placeholder) => (
        <div className="mt-8 pt-6 border-t border-white/10">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-cyan-400 capitalize">{title}</h2>
                <button 
                    onClick={() => addListItem(field)}
                    className="btn btn-xs btn-outline border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white rounded-full"
                >
                    + Add
                </button>
            </div>
            <div className="space-y-3">
                {cvData[field].map((item, index) => (
                    <div key={index} className="flex gap-2 animate-fadeIn">
                        <input 
                            type="text" 
                            placeholder={placeholder}
                            value={item}
                            className="input input-sm input-bordered flex-1 bg-white/5 border-white/10 text-white focus:border-cyan-500"
                            onChange={(e) => handleListChange(field, index, e.target.value)}
                        />
                        <button 
                            onClick={() => removeListItem(field, index)}
                            className="btn btn-sm btn-circle btn-ghost text-red-500 hover:bg-red-500/10"
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl space-y-6">
            <h2 className="text-2xl font-bold text-cyan-400 mb-6 underline decoration-cyan-500/30">Edit Resume Details</h2>
            
            <div className="space-y-4">
                {/* --- Primary Info --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                        <input 
                            type="text" 
                            value={cvData.personalInfo.fullName}
                            className="input input-bordered w-full bg-white/5 border-white/10 text-white focus:border-cyan-500"
                            onChange={(e) => updatePersonalInfo({ fullName: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="text-xs text-gray-400 uppercase tracking-widest ml-1">Profile Photo</label>
                        <input 
                            type="file" 
                            className="file-input file-input-bordered file-input-sm w-full bg-white/5 border-white/10 text-white"
                            onChange={handleImageChange}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs text-gray-400 uppercase tracking-widest ml-1">Mobile</label>
                        <input 
                            type="text" 
                            value={cvData.personalInfo.contactMobile}
                            className="input input-bordered w-full bg-white/5 border-white/10 text-white focus:border-cyan-500"
                            onChange={(e) => updatePersonalInfo({ contactMobile: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="text-xs text-gray-400 uppercase tracking-widest ml-1">Email</label>
                        <input 
                            type="email" 
                            value={cvData.personalInfo.email}
                            className="input input-bordered w-full bg-white/5 border-white/10 text-white focus:border-cyan-500"
                            onChange={(e) => updatePersonalInfo({ email: e.target.value })}
                        />
                    </div>
                </div>

                {/* --- Detailed Personal Information (আপনার ছবি অনুযায়ী সব ফিল্ড) --- */}
                <div className="pt-6 border-t border-white/10">
                    <h3 className="text-lg font-semibold text-gray-300 mb-4">Detailed Personal Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-[10px] text-gray-500 uppercase ml-1">Father's Name</label>
                            <input 
                                type="text" 
                                value={cvData.personalDetails.fatherName}
                                className="input input-sm input-bordered w-full bg-white/5 border-white/10 text-white focus:border-cyan-500"
                                onChange={(e) => updatePersonalDetails('fatherName', e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="text-[10px] text-gray-500 uppercase ml-1">Mother's Name</label>
                            <input 
                                type="text" 
                                value={cvData.personalDetails.motherName}
                                className="input input-sm input-bordered w-full bg-white/5 border-white/10 text-white focus:border-cyan-500"
                                onChange={(e) => updatePersonalDetails('motherName', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="mt-4">
                        <label className="text-[10px] text-gray-500 uppercase ml-1">Present Address</label>
                        <textarea 
                            className="textarea textarea-sm textarea-bordered w-full bg-white/5 border-white/10 text-white"
                            value={cvData.personalDetails.presentAddress}
                            onChange={(e) => updatePersonalDetails('presentAddress', e.target.value)}
                        ></textarea>
                    </div>

                    <div className="mt-4">
                        <label className="text-[10px] text-gray-500 uppercase ml-1">Permanent Address</label>
                        <textarea 
                            className="textarea textarea-sm textarea-bordered w-full bg-white/5 border-white/10 text-white"
                            value={cvData.personalDetails.permanentAddress}
                            onChange={(e) => updatePersonalDetails('permanentAddress', e.target.value)}
                        ></textarea>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                        <div>
                            <label className="text-[10px] text-gray-500 uppercase ml-1">Place of Birth</label>
                            <input type="text" value={cvData.personalDetails.placeOfBirth} className="input input-sm input-bordered w-full bg-white/5 text-white" onChange={(e) => updatePersonalDetails('placeOfBirth', e.target.value)} />
                        </div>
                        <div>
                            <label className="text-[10px] text-gray-500 uppercase ml-1">Date of Birth</label>
                            <input type="text" value={cvData.personalDetails.dateOfBirth} className="input input-sm input-bordered w-full bg-white/5 text-white" onChange={(e) => updatePersonalDetails('dateOfBirth', e.target.value)} />
                        </div>
                        <div>
                            <label className="text-[10px] text-gray-500 uppercase ml-1">Religion</label>
                            <input type="text" value={cvData.personalDetails.religion} className="input input-sm input-bordered w-full bg-white/5 text-white" onChange={(e) => updatePersonalDetails('religion', e.target.value)} />
                        </div>
                        <div>
                            <label className="text-[10px] text-gray-500 uppercase ml-1">Nationality</label>
                            <input type="text" value={cvData.personalDetails.nationality} className="input input-sm input-bordered w-full bg-white/5 text-white" onChange={(e) => updatePersonalDetails('nationality', e.target.value)} />
                        </div>
                        <div>
                            <label className="text-[10px] text-gray-500 uppercase ml-1">Height</label>
                            <input type="text" value={cvData.personalDetails.height} className="input input-sm input-bordered w-full bg-white/5 text-white" onChange={(e) => updatePersonalDetails('height', e.target.value)} />
                        </div>
                        <div>
                            <label className="text-[10px] text-gray-500 uppercase ml-1">Weight</label>
                            <input type="text" value={cvData.personalDetails.weight} className="input input-sm input-bordered w-full bg-white/5 text-white" onChange={(e) => updatePersonalDetails('weight', e.target.value)} />
                        </div>
                        <div>
                            <label className="text-[10px] text-gray-500 uppercase ml-1">Blood Group</label>
                            <input type="text" value={cvData.personalDetails.bloodGroup} className="input input-sm input-bordered w-full bg-white/5 text-white" onChange={(e) => updatePersonalDetails('bloodGroup', e.target.value)} />
                        </div>
                        <div>
                            <label className="text-[10px] text-gray-500 uppercase ml-1">Sex</label>
                            <input type="text" value={cvData.personalDetails.sex} className="input input-sm input-bordered w-full bg-white/5 text-white" onChange={(e) => updatePersonalDetails('sex', e.target.value)} />
                        </div>
                        <div>
                            <label className="text-[10px] text-gray-500 uppercase ml-1">Marriage Status</label>
                            <input type="text" value={cvData.personalDetails.marriageStatus} className="input input-sm input-bordered w-full bg-white/5 text-white" onChange={(e) => updatePersonalDetails('marriageStatus', e.target.value)} />
                        </div>
                    </div>

                    <div className="mt-4">
                        <label className="text-[10px] text-gray-500 uppercase ml-1">NID Number</label>
                        <input type="text" value={cvData.personalDetails.nid} className="input input-sm input-bordered w-full bg-white/5 text-white" onChange={(e) => updatePersonalDetails('nid', e.target.value)} />
                    </div>
                </div>

                {/* --- Career Info --- */}
                <div className="pt-6 border-t border-white/10">
                    <label className="text-xs text-gray-400 uppercase tracking-widest ml-1">Career Objective</label>
                    <textarea 
                        className="textarea textarea-bordered w-full bg-white/5 border-white/10 text-white h-24 focus:border-cyan-500"
                        value={cvData.objective}
                        onChange={(e) => setCvData({...cvData, objective: e.target.value})}
                    ></textarea>
                </div>

                <div>
                    <label className="text-xs text-gray-400 uppercase tracking-widest ml-1">Personal Profile</label>
                    <textarea 
                        className="textarea textarea-bordered w-full bg-white/5 border-white/10 text-white h-24 focus:border-cyan-500"
                        value={cvData.profile}
                        onChange={(e) => setCvData({...cvData, profile: e.target.value})}
                    ></textarea>
                </div>
            </div>

            {/* Educational Qualification Section */}
            <div className="mt-10 pt-6 border-t border-white/10">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-cyan-400">Education</h2>
                    <button 
                        onClick={addEducation}
                        className="btn btn-sm btn-outline border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white rounded-full"
                    >
                        + Add Education
                    </button>
                </div>

                <div className="space-y-6">
                    {cvData.education.map((edu) => (
                        <div key={edu.id} className="p-4 bg-white/5 border border-white/5 rounded-2xl relative group animate-fadeIn">
                            <button 
                                onClick={() => removeEducation(edu.id)}
                                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                ✕
                            </button>

                            <div className="grid grid-cols-1 gap-3">
                                <input 
                                    type="text"
                                    placeholder="Exam Title"
                                    value={edu.examTitle}
                                    className="input input-sm input-bordered w-full bg-white/5 text-white"
                                    onChange={(e) => handleEduChange(edu.id, 'examTitle', e.target.value)}
                                />
                                <input 
                                    type="text"
                                    placeholder="Institution Name"
                                    value={edu.instName}
                                    className="input input-sm input-bordered w-full bg-white/5 text-white"
                                    onChange={(e) => handleEduChange(edu.id, 'instName', e.target.value)}
                                />
                                <div className="grid grid-cols-2 gap-3">
                                    <input type="text" placeholder="Board" value={edu.board} className="input input-sm input-bordered w-full bg-white/5 text-white" onChange={(e) => handleEduChange(edu.id, 'board', e.target.value)} />
                                    <input type="text" placeholder="Group" value={edu.group} className="input input-sm input-bordered w-full bg-white/5 text-white" onChange={(e) => handleEduChange(edu.id, 'group', e.target.value)} />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <input type="text" placeholder="Result" value={edu.result} className="input input-sm input-bordered w-full bg-white/5 text-white" onChange={(e) => handleEduChange(edu.id, 'result', e.target.value)} />
                                    <input type="text" placeholder="Passing Year" value={edu.passingYear} className="input input-sm input-bordered w-full bg-white/5 text-white" onChange={(e) => handleEduChange(edu.id, 'passingYear', e.target.value)} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Dynamic List Sections */}
            {renderListInput("Technical Skills", "skills", "e.g. MS Office")}
            {renderListInput("Specialized Experience", "experience", "e.g. Visa Processing")}
            {renderListInput("Languages", "languages", "e.g. Bangla")}
            {renderListInput("Strengths", "strengths", "e.g. Quick Learner")}

        </div>
    );
};

export default FormSection;