import React, { useContext, useRef } from 'react';
import { CVContext } from '../context/CVContext';
import { useReactToPrint } from 'react-to-print';

const PreviewSection = () => {
    const { cvData } = useContext(CVContext);
    const componentRef = useRef();

    // Google Sheets এ ডেটা পাঠানোর ফাংশন
    const saveToGoogleSheet = async () => {
        const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz7aFe8e5_iw58rtKXMXCxNWOvcos3LIATzC3kesPeq85ZSePu3YC18d-0-v_hsWFJ2HA/exec'
        
        try {
            await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(cvData),
            });
            console.log("Data sent to Google Sheet successfully!");
        } catch (error) {
            console.error("Error sending data to sheet:", error);
        }
    };

    // react-to-print এর মাধ্যমে ডাউনলোড সিস্টেম
    const handlePrint = useReactToPrint({
        contentRef: componentRef,
        documentTitle: `CV_of_${cvData?.personalInfo?.fullName || 'Candidate'}`,
        onAfterPrint: () => {
            console.log("PDF generated!");
            saveToGoogleSheet();
        }
    });

    if (!cvData) return <div className="text-white text-center mt-10">Loading Data...</div>;

    const sectionHeaderStyle = {
        backgroundColor: '#D1D5DB', 
        color: '#000000',
        padding: '4px 12px',
        fontWeight: 'bold',
        fontSize: '17px',
        textTransform: 'uppercase',
        border: '1px solid #9ca3af',
        marginBottom: '12px',
        display: 'block'
    };

    return (
        <div className="flex flex-col items-center w-full overflow-x-hidden pb-24">
            <div className="w-full flex justify-center bg-slate-900/30 rounded-xl p-2 md:p-4 overflow-auto">
                <div className="origin-top scale-[0.45] md:scale-[0.55] lg:scale-[0.65] transition-all">
                    <div 
                        ref={componentRef}
                        className="cv-print-container w-[210mm] min-h-[297mm] p-[20mm] font-serif shadow-2xl mx-auto"
                        style={{ backgroundColor: '#ffffff', color: '#000000' }} 
                    >
                        {/* ১. হেডার */}
                        <div className="relative mb-10 flex justify-between items-start">
                            <div className="flex-1 pr-4 pt-4">
                                <h1 className="text-3xl font-bold uppercase text-center mb-1" style={{color: '#000000'}}>CURRICULUM VITAE</h1>
                                <h2 className="text-lg font-bold text-center mb-2" style={{color: '#000000'}}>OF</h2>
                                <h2 className="text-2xl font-bold text-center underline uppercase mb-6 decoration-1 underline-offset-4" style={{color: '#000000'}}>
                                    {cvData.personalInfo.fullName}
                                </h2>
                                <div className="text-center space-y-1">
                                    <p className="text-[16px] font-semibold" style={{color: '#000000'}}>Contact Mobile: {cvData.personalInfo.contactMobile}</p>
                                    <p className="text-[16px] font-semibold" style={{color: '#000000'}}>Email: {cvData.personalInfo.email}</p>
                                </div>
                            </div>
                            <div className="w-[150px] h-[180px] border border-black p-1 flex-shrink-0" style={{borderColor: '#000000'}}>
                                {cvData.personalInfo.profilePic ? (
                                    <img 
                                        src={cvData.personalInfo.profilePic} 
                                        className="w-full h-full object-cover" 
                                        alt="Profile" 
                                        crossOrigin="anonymous" 
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-xs italic">Photo</div>
                                )}
                            </div>
                        </div>

                        {/* ২. অবজেক্টিভ ও প্রোফাইল */}
                        <div className="mb-6 text-left">
                            <h3 style={sectionHeaderStyle}>Objective</h3>
                            <p className="text-[15px] leading-relaxed text-justify px-1" style={{color: '#000000'}}>{cvData.objective}</p>
                        </div>

                        <div className="mb-6 text-left">
                            <h3 style={sectionHeaderStyle}>Profile</h3>
                            <p className="text-[15px] leading-relaxed text-justify px-1" style={{color: '#000000'}}>{cvData.profile}</p>
                        </div>

                        {/* ৩. এডুকেশন */}
                        <div className="mb-6 text-left">
                            <h3 style={sectionHeaderStyle}>Educational Qualification</h3>
                            <div className="space-y-6">
                                {cvData.education.map((edu, index) => (
                                    <div key={index}>
                                        <h4 className="font-bold text-[16px] underline mb-2 italic" style={{color: '#000000'}}>{edu.examTitle}:</h4>
                                        <div className="text-[15px] space-y-1 ml-2">
                                            <div className="flex"><span className="w-44 shrink-0 font-bold">Institution Name</span><span className="w-6 text-center">:</span><span style={{color: '#000000'}}>{edu.instName}</span></div>
                                            <div className="flex"><span className="w-44 shrink-0 font-bold">Board</span><span className="w-6 text-center">:</span><span style={{color: '#000000'}}>{edu.board}</span></div>
                                            <div className="flex"><span className="w-44 shrink-0 font-bold">Group</span><span className="w-6 text-center">:</span><span style={{color: '#000000'}}>{edu.group}</span></div>
                                            <div className="flex"><span className="w-44 shrink-0 font-bold">Result</span><span className="w-6 text-center">:</span><span style={{color: '#000000'}}>{edu.result}</span></div>
                                            <div className="flex"><span className="w-44 shrink-0 font-bold">Passing Year</span><span className="w-6 text-center">:</span><span style={{color: '#000000'}}>{edu.passingYear}</span></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* ৪. টেকনিক্যাল স্কিল ও এক্সপেরিয়েন্স */}
                        <div className="mb-6 text-left">
                            <h3 style={sectionHeaderStyle}>Technical Skill</h3>
                            <ul className="list-none space-y-1 ml-4 text-[15px]">
                                {cvData.skills.map((s, i) => (
                                    <li key={i} className="italic" style={{color: '#000000'}}>➤ {s}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="mb-6 text-left">
                            <h3 style={sectionHeaderStyle}>Specialized Experience</h3>
                            <ul className="list-none space-y-1 ml-4 text-[15px]">
                                {cvData.experience.map((ex, i) => (
                                    <li key={i} style={{color: '#000000'}}>❖ {ex}</li>
                                ))}
                            </ul>
                        </div>

                        {/* ৫. ল্যাঙ্গুয়েজ ও স্ট্রেংথ */}
                        <div className="grid grid-cols-2 gap-4 mb-8 text-left">
                            <div>
                                <h3 style={{...sectionHeaderStyle, fontSize: '16px'}}>Language</h3>
                                <ul className="list-none space-y-1 ml-4 text-[14px]">
                                    {cvData.languages.map((l, i) => <li key={i} style={{color: '#000000'}}>▪ {l}</li>)}
                                </ul>
                            </div>
                            <div>
                                <h3 style={{...sectionHeaderStyle, fontSize: '16px'}}>Strengths</h3>
                                <ul className="list-none space-y-1 ml-4 text-[14px]">
                                    {cvData.strengths.map((st, i) => <li key={i} style={{color: '#000000'}}>❑ {st}</li>)}
                                </ul>
                            </div>
                        </div>

                        {/* ৬. পার্সোনাল ইনফরমেশন */}
                        <div className="mb-8 text-left">
                            <h3 style={sectionHeaderStyle}>Personal Information</h3>
                            <div className="text-[15px] space-y-1 px-1">
                                <div className="flex"><span className="w-44 shrink-0 font-bold">Name</span><span className="w-6 text-center">:</span><span style={{color: '#000000'}}>{cvData.personalInfo.fullName}</span></div>
                                <div className="flex"><span className="w-44 shrink-0 font-bold">Father's Name</span><span className="w-6 text-center">:</span><span style={{color: '#000000'}}>{cvData.personalDetails.fatherName}</span></div>
                                <div className="flex"><span className="w-44 shrink-0 font-bold">Mother's Name</span><span className="w-6 text-center">:</span><span style={{color: '#000000'}}>{cvData.personalDetails.motherName}</span></div>
                                <div className="flex"><span className="w-44 shrink-0 font-bold">Present Address</span><span className="w-6 text-center">:</span><span style={{color: '#000000'}}>{cvData.personalDetails.presentAddress}</span></div>
                                <div className="flex"><span className="w-44 shrink-0 font-bold">Permanent Address</span><span className="w-6 text-center">:</span><span style={{color: '#000000'}}>{cvData.personalDetails.permanentAddress}</span></div>
                                <div className="flex"><span className="w-44 shrink-0 font-bold">Place of Birth</span><span className="w-6 text-center">:</span><span style={{color: '#000000'}}>{cvData.personalDetails.placeOfBirth}</span></div>
                                <div className="flex"><span className="w-44 shrink-0 font-bold">Date of Birth</span><span className="w-6 text-center">:</span><span style={{color: '#000000'}}>{cvData.personalDetails.dateOfBirth}</span></div>
                                <div className="flex"><span className="w-44 shrink-0 font-bold">Religion</span><span className="w-6 text-center">:</span><span style={{color: '#000000'}}>{cvData.personalDetails.religion}</span></div>
                                <div className="flex"><span className="w-44 shrink-0 font-bold">Nationality</span><span className="w-6 text-center">:</span><span style={{color: '#000000'}}>{cvData.personalDetails.nationality}</span></div>
                                <div className="flex"><span className="w-44 shrink-0 font-bold">Height</span><span className="w-6 text-center">:</span><span style={{color: '#000000'}}>{cvData.personalDetails.height}</span></div>
                                <div className="flex"><span className="w-44 shrink-0 font-bold">Weight</span><span className="w-6 text-center">:</span><span style={{color: '#000000'}}>{cvData.personalDetails.weight}</span></div>
                                <div className="flex"><span className="w-44 shrink-0 font-bold">Blood Group</span><span className="w-6 text-center">:</span><span style={{color: '#000000'}}>{cvData.personalDetails.bloodGroup}</span></div>
                                <div className="flex"><span className="w-44 shrink-0 font-bold">NID Number</span><span className="w-6 text-center">:</span><span style={{color: '#000000'}}>{cvData.personalDetails.nid}</span></div>
                                <div className="flex"><span className="w-44 shrink-0 font-bold">Sex</span><span className="w-6 text-center">:</span><span style={{color: '#000000'}}>{cvData.personalDetails.sex}</span></div>
                                <div className="flex"><span className="w-44 shrink-0 font-bold">Marriage Status</span><span className="w-6 text-center">:</span><span style={{color: '#000000'}}>{cvData.personalDetails.marriageStatus}</span></div>
                            </div>
                        </div>

                        {/* ৭. সিগনেচার */}
                        <div className="mt-12 text-[15px] text-left">
                            <p className="mb-10" style={{color: '#000000'}}>Sincerely</p>
                            <div className="inline-block min-w-[160px]">
                                <p className="font-bold border-t border-black pt-1" style={{color: '#000000', borderColor: '#000000'}}>
                                    {cvData.personalInfo.fullName}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* বাটনটি মোবাইলে স্ক্রিনের সাথে ফিক্সড করা হয়েছে যাতে সবসময় দেখা যায় */}
            <div className="fixed bottom-4 left-0 w-full px-6 md:relative md:bottom-0 md:px-0 flex justify-center z-50">
                <button 
                    onClick={handlePrint}
                    className="w-full max-w-xs md:w-auto mt-6 px-12 py-4 bg-gradient-to-r from-green-600 to-teal-500 text-white font-bold rounded-full shadow-2xl hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                    📥 Download PDF CV
                </button>
            </div>
        </div>
    );
};

export default PreviewSection;