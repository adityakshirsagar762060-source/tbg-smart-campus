import React, { useState, useRef } from 'react';
import {
    Upload,
    AlertCircle,
    CheckCircle2,
    FileText,
    Shield,
    Lock,
    X,
    Mail,
    Phone,
    Clock,
    Sparkles,
    ArrowRight,
    ChevronDown
} from 'lucide-react';

const RaiseComplaint = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        enrollmentNumber: '',
        department: '',
        complaintCategory: '',
        priorityLevel: 'medium',
        subject: '',
        description: '',
    });

    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errors, setErrors] = useState({});
    const dragRef = useRef(null);
    const fileInputRef = useRef(null);

    const departments = [
        'Computer Engineering',
        'Mechanical Engineering',
        'Civil Engineering',
        'Electrical Engineering',
        'Electronics Engineering',
    ];

    const complaintCategories = [
        'Infrastructure & Maintenance',
        'Hostel & Accommodation',
        'Academics & Faculty',
        'IT & Wi-Fi Network',
        'Canteen & Food Quality',
        'Anti-Ragging / Harassment',
        'Other Issues',
    ];

    const priorityLevels = [
        { value: 'low', label: 'Low', color: 'from-blue-500/20 to-cyan-500/20' },
        { value: 'medium', label: 'Medium', color: 'from-amber-500/20 to-orange-500/20' },
        { value: 'high', label: 'High', color: 'from-rose-500/20 to-pink-500/20' },
        { value: 'urgent', label: 'Urgent', color: 'from-red-950/30 to-rose-950/30' },
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'enrollmentNumber' ? value.toUpperCase() : value,
        }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const handlePriorityChange = (value) => {
        setFormData((prev) => ({ ...prev, priorityLevel: value }));
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dragRef.current?.classList.add('ring-2', 'ring-white/40', 'bg-white/5');
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dragRef.current?.classList.remove('ring-2', 'ring-white/40', 'bg-white/5');
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dragRef.current?.classList.remove('ring-2', 'ring-white/40', 'bg-white/5');

        const files = Array.from(e.dataTransfer.files);
        addFiles(files);
    };

    const handleFileClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        addFiles(files);
    };

    const addFiles = (files) => {
        const validFiles = files.filter((file) => {
            const maxSize = 5 * 1024 * 1024;
            return file.size <= maxSize;
        });

        const newFiles = validFiles.map((file, idx) => ({
            id: `${Date.now()}-${idx}`,
            name: file.name,
            size: (file.size / 1024).toFixed(2),
            type: file.type,
        }));

        setUploadedFiles((prev) => [...prev, ...newFiles]);
    };

    const removeFile = (id) => {
        setUploadedFiles((prev) => prev.filter((file) => file.id !== id));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
        if (!formData.enrollmentNumber.trim()) newErrors.enrollmentNumber = 'Enrollment number is required';
        if (!formData.department) newErrors.department = 'Department selection is required';
        if (!formData.complaintCategory) newErrors.complaintCategory = 'Complaint category is required';
        if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
        if (!formData.description.trim()) newErrors.description = 'Description is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        await new Promise((resolve) => setTimeout(resolve, 2000));

        setIsSubmitting(false);
        setIsSubmitted(true);

        setTimeout(() => {
            setIsSubmitted(false);
            setFormData({
                fullName: '',
                enrollmentNumber: '',
                department: '',
                complaintCategory: '',
                priorityLevel: 'medium',
                subject: '',
                description: '',
            });
            setUploadedFiles([]);
        }, 3000);
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-[#050b14] flex items-center justify-center p-4">
                <style>{`
          @keyframes shimmer-success {
            0% { opacity: 0; transform: scale(0.95); }
            50% { opacity: 1; }
            100% { opacity: 1; transform: scale(1); }
          }
          @keyframes float-up {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .success-card { animation: float-up 0.6s ease-out; }
          .success-icon { animation: shimmer-success 0.8s ease-out; }
        `}</style>
                <div className="w-full max-w-2xl">
                    <div className="success-card backdrop-blur-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-3xl p-16 text-center shadow-2xl">
                        <div className="mb-8 flex justify-center">
                            <div className="success-icon relative w-24 h-24">
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/40 via-teal-500/30 to-cyan-500/20 rounded-full blur-2xl animate-pulse" />
                                <div className="relative w-24 h-24 bg-gradient-to-br from-emerald-500/20 to-teal-500/10 rounded-full flex items-center justify-center border border-emerald-400/30">
                                    <CheckCircle2 className="w-12 h-12 text-emerald-300" />
                                </div>
                            </div>
                        </div>

                        <h2 className="text-4xl font-bold text-white mb-3 bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
                            Complaint Submitted
                        </h2>
                        <p className="text-white/70 mb-2 text-lg">Your complaint has been registered successfully.</p>
                        <p className="text-white/50 text-base mb-8">
                            We will review your complaint and respond within 24-48 hours.
                        </p>

                        <div className="bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-cyan-500/15 border border-emerald-400/30 rounded-2xl p-6 mb-8 backdrop-blur-sm">
                            <p className="text-emerald-200 text-sm font-semibold tracking-wide">
                                COMPLAINT ID: {Math.random().toString(36).substring(7).toUpperCase()}
                            </p>
                            <p className="text-emerald-300/60 text-xs mt-2">Reference this ID when checking status</p>
                        </div>

                        <button
                            onClick={() => window.location.reload()}
                            className="w-full bg-white/95 text-[#050b14] font-bold py-4 px-8 rounded-xl hover:bg-white transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105 active:scale-95 group relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/50 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                            <span className="relative flex items-center justify-center gap-2">
                                Submit Another Complaint
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050b14] p-6 lg:p-8">
            <style>{`
        select option {
          background: #0f1825;
          color: white;
          padding: 10px;
        }
        select option:hover, select option:checked {
          background: #1a2844;
        }

        @keyframes shimmer {
          0% { left: -1000px; }
          100% { left: 1000px; }
        }
        
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        .submit-button-shimmer {
          position: relative;
          overflow: hidden;
        }
        
        .submit-button-shimmer::before {
          content: '';
          position: absolute;
          top: 0;
          left: -1000px;
          width: 1000px;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          animation: shimmer 1.5s ease-in-out infinite;
        }

        .input-focus:focus {
          border-color: rgba(255,255,255,0.35) !important;
          background-color: rgba(255,255,255,0.12) !important;
          box-shadow: 0 0 0 3px rgba(255,255,255,0.05) !important;
          outline: none;
        }

        .priority-button {
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .priority-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 24px rgba(0,0,0,0.4);
        }

        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .drag-area:hover {
          animation: gradient-shift 3s ease infinite;
        }
      `}</style>

            <div className="max-w-7xl mx-auto pt-20">
                <div className="mb-12">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-8 h-8 text-cyan-400 animate-pulse" />
                            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
                                Raise a Complaint
                            </h1>
                        </div>
                        <p className="text-white/60 text-lg md:ml-10">
                            Help us improve by sharing your concerns and feedback securely
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="group backdrop-blur-2xl bg-gradient-to-br from-white/8 to-white/3 border border-white/15 rounded-3xl p-8 transition-all duration-500 shadow-xl hover:border-white/30 hover:shadow-[0_0_40px_rgba(34,211,238,0.05)]">
                                <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
                                    <div className="p-2.5 bg-gradient-to-br from-blue-500/30 to-cyan-600/20 rounded-lg group-hover:from-blue-500/40 group-hover:to-cyan-600/30 transition-all">
                                        <Mail className="w-5 h-5 text-cyan-300" />
                                    </div>
                                    <span className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
                                        Personal Details
                                    </span>
                                </h2>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="col-span-2 sm:col-span-1">
                                        <label className="block text-xs uppercase tracking-wider font-bold text-white/70 mb-2 ml-1">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleInputChange}
                                            placeholder="Enter your full name"
                                            className={`input-focus w-full px-5 py-4 rounded-xl bg-gradient-to-br from-white/5 to-white/2 border backdrop-blur-xl transition-all duration-300 placeholder-white/30 text-white font-medium ${errors.fullName
                                                ? 'border-red-500/60'
                                                : 'border-white/10 hover:border-white/25'
                                                }`}
                                        />
                                        {errors.fullName && (
                                            <p className="text-red-400 text-sm mt-2 flex items-center gap-1 ml-1">
                                                <AlertCircle className="w-3 h-3" />
                                                {errors.fullName}
                                            </p>
                                        )}
                                    </div>

                                    <div className="col-span-2 sm:col-span-1">
                                        <label className="block text-xs uppercase tracking-wider font-bold text-white/70 mb-2 ml-1">
                                            Enrollment Number
                                        </label>
                                        <input
                                            type="text"
                                            name="enrollmentNumber"
                                            value={formData.enrollmentNumber}
                                            onChange={handleInputChange}
                                            placeholder="E.g., TBG123456"
                                            className={`input-focus w-full px-5 py-4 rounded-xl bg-gradient-to-br from-white/5 to-white/2 border backdrop-blur-xl transition-all duration-300 placeholder-white/30 text-white font-medium uppercase tracking-wider ${errors.enrollmentNumber
                                                ? 'border-red-500/60'
                                                : 'border-white/10 hover:border-white/25'
                                                }`}
                                        />
                                        {errors.enrollmentNumber && (
                                            <p className="text-red-400 text-sm mt-2 flex items-center gap-1 ml-1">
                                                <AlertCircle className="w-3 h-3" />
                                                {errors.enrollmentNumber}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="group backdrop-blur-2xl bg-gradient-to-br from-white/8 to-white/3 border border-white/15 rounded-3xl p-8 transition-all duration-500 shadow-xl hover:border-white/30 hover:shadow-[0_0_40px_rgba(168,85,247,0.05)]">
                                <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
                                    <div className="p-2.5 bg-gradient-to-br from-purple-500/30 to-pink-600/20 rounded-lg group-hover:from-purple-500/40 group-hover:to-pink-600/30 transition-all">
                                        <FileText className="w-5 h-5 text-purple-300" />
                                    </div>
                                    <span className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
                                        Complaint Details
                                    </span>
                                </h2>

                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-xs uppercase tracking-wider font-bold text-white/70 mb-2 ml-1">
                                            Department
                                        </label>
                                        <div className="relative">
                                            <select
                                                name="department"
                                                value={formData.department}
                                                onChange={handleInputChange}
                                                className={`input-focus w-full px-5 py-4 rounded-xl bg-gradient-to-br from-white/5 to-white/2 border backdrop-blur-xl transition-all duration-300 text-white font-medium appearance-none cursor-pointer ${errors.department ? 'border-red-500/60' : 'border-white/10 hover:border-white/25'
                                                    }`}
                                            >
                                                <option value="" className="bg-[#0f1825] text-white/50">Select your department</option>
                                                {departments.map((dept) => (
                                                    <option key={dept} value={dept}>
                                                        {dept}
                                                    </option>
                                                ))}
                                            </select>
                                            <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50 pointer-events-none" />
                                        </div>
                                        {errors.department && (
                                            <p className="text-red-400 text-sm mt-2 flex items-center gap-1 ml-1">
                                                <AlertCircle className="w-3 h-3" />
                                                {errors.department}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-xs uppercase tracking-wider font-bold text-white/70 mb-2 ml-1">
                                            Complaint Category
                                        </label>
                                        <div className="relative">
                                            <select
                                                name="complaintCategory"
                                                value={formData.complaintCategory}
                                                onChange={handleInputChange}
                                                className={`input-focus w-full px-5 py-4 rounded-xl bg-gradient-to-br from-white/5 to-white/2 border backdrop-blur-xl transition-all duration-300 text-white font-medium appearance-none cursor-pointer ${errors.complaintCategory ? 'border-red-500/60' : 'border-white/10 hover:border-white/25'
                                                    }`}
                                            >
                                                <option value="" className="bg-[#0f1825] text-white/50">Select complaint category</option>
                                                {complaintCategories.map((cat) => (
                                                    <option key={cat} value={cat}>
                                                        {cat}
                                                    </option>
                                                ))}
                                            </select>
                                            <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50 pointer-events-none" />
                                        </div>
                                        {errors.complaintCategory && (
                                            <p className="text-red-400 text-sm mt-2 flex items-center gap-1 ml-1">
                                                <AlertCircle className="w-3 h-3" />
                                                {errors.complaintCategory}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-xs uppercase tracking-wider font-bold text-white/70 mb-3 ml-1">
                                            Priority Level
                                        </label>
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                            {priorityLevels.map((level) => (
                                                <button
                                                    key={level.value}
                                                    type="button"
                                                    onClick={() => handlePriorityChange(level.value)}
                                                    className={`priority-button relative px-5 py-3 rounded-xl font-bold text-sm transition-all duration-300 overflow-hidden ${formData.priorityLevel === level.value
                                                        ? `bg-gradient-to-r ${level.color} border-2 border-white/40 text-white shadow-2xl`
                                                        : `bg-gradient-to-br from-white/5 to-white/2 border border-white/10 text-white/70 hover:border-white/25 hover:from-white/10 hover:to-white/5`
                                                        }`}
                                                >
                                                    <span className="relative z-10">{level.label}</span>
                                                    {formData.priorityLevel === level.value && (
                                                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 animate-pulse" />
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs uppercase tracking-wider font-bold text-white/70 mb-2 ml-1">
                                            Subject
                                        </label>
                                        <input
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleInputChange}
                                            placeholder="Brief subject of your complaint"
                                            className={`input-focus w-full px-5 py-4 rounded-xl bg-gradient-to-br from-white/5 to-white/2 border backdrop-blur-xl transition-all duration-300 placeholder-white/30 text-white font-medium ${errors.subject
                                                ? 'border-red-500/60'
                                                : 'border-white/10 hover:border-white/25'
                                                }`}
                                        />
                                        {errors.subject && (
                                            <p className="text-red-400 text-sm mt-2 flex items-center gap-1 ml-1">
                                                <AlertCircle className="w-3 h-3" />
                                                {errors.subject}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-xs uppercase tracking-wider font-bold text-white/70 mb-2 ml-1">
                                            Detailed Description
                                        </label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            placeholder="Provide detailed information about your complaint..."
                                            rows="5"
                                            className={`input-focus w-full px-5 py-4 rounded-xl bg-gradient-to-br from-white/5 to-white/2 border backdrop-blur-xl transition-all duration-300 placeholder-white/30 text-white font-medium resize-none ${errors.description
                                                ? 'border-red-500/60'
                                                : 'border-white/10 hover:border-white/25'
                                                }`}
                                        />
                                        {errors.description && (
                                            <p className="text-red-400 text-sm mt-2 flex items-center gap-1 ml-1">
                                                <AlertCircle className="w-3 h-3" />
                                                {errors.description}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="group backdrop-blur-2xl bg-gradient-to-br from-white/8 to-white/3 border border-white/15 rounded-3xl p-8 transition-all duration-500 shadow-xl hover:border-white/30 hover:shadow-[0_0_40px_rgba(6,182,212,0.05)]">
                                <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
                                    <div className="p-2.5 bg-gradient-to-br from-cyan-500/30 to-blue-600/20 rounded-lg group-hover:from-cyan-500/40 group-hover:to-blue-600/30 transition-all">
                                        <Upload className="w-5 h-5 text-cyan-300" />
                                    </div>
                                    <span className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
                                        Evidence & Proof
                                    </span>
                                </h2>

                                <div
                                    ref={dragRef}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                    onClick={handleFileClick}
                                    className="drag-area mb-8 relative p-10 border-2 border-dashed border-white/20 rounded-2xl bg-gradient-to-br from-white/5 to-white/2 hover:border-white/40 hover:from-white/10 hover:to-white/5 transition-all duration-500 cursor-pointer group shadow-inner"
                                >
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        multiple
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />

                                    <div className="flex flex-col items-center justify-center gap-4">
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 via-blue-500/30 to-cyan-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                                            <Upload className="w-10 h-10 text-cyan-300/80 group-hover:text-cyan-200 transition-all duration-300 relative" />
                                        </div>
                                        <div className="text-center space-y-2">
                                            <p className="text-white font-bold text-lg group-hover:text-white/90 transition-all">
                                                Drag and drop files here or click to browse
                                            </p>
                                            <p className="text-white/50 text-sm">
                                                Images, PDF, Documents • Max 5MB each
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {uploadedFiles.length > 0 && (
                                    <div className="space-y-4 p-5 rounded-2xl bg-gradient-to-br from-white/5 to-white/2 border border-white/10">
                                        <p className="text-sm font-bold text-white/80">
                                            ✓ {uploadedFiles.length} file{uploadedFiles.length !== 1 ? 's' : ''} uploaded
                                        </p>
                                        {uploadedFiles.map((file) => (
                                            <div
                                                key={file.id}
                                                className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-white/5 to-white/2 border border-white/10 hover:border-white/20 transition-all duration-300 group"
                                            >
                                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                                    <FileText className="w-5 h-5 text-cyan-300 flex-shrink-0" />
                                                    <div className="min-w-0 flex-1">
                                                        <p className="text-sm font-medium text-white truncate">{file.name}</p>
                                                        <p className="text-xs text-white/50">{file.size} KB</p>
                                                    </div>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={(e) => { e.stopPropagation(); removeFile(file.id); }}
                                                    className="ml-3 p-2 text-white/50 hover:text-white hover:bg-red-500/20 hover:border-red-500/30 rounded-lg transition-all flex-shrink-0 group-hover:scale-110 border border-transparent"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="submit-button-shimmer w-full bg-white text-[#050b14] font-bold py-5 px-8 rounded-2xl hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] group relative hover:scale-[1.01] active:scale-[0.99]"
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center justify-center gap-3 relative z-10">
                                        <div className="w-5 h-5 border-2 border-[#050b14]/30 border-t-[#050b14] rounded-full animate-spin" />
                                        <span>Submitting Complaint...</span>
                                    </div>
                                ) : (
                                    <span className="flex items-center justify-center gap-2 relative z-10">
                                        Submit Official Grievance
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                    </span>
                                )}
                            </button>
                        </form>
                    </div>

                    <div className="lg:col-span-4">
                        <div className="sticky top-28 space-y-6">
                            <div className="group backdrop-blur-2xl bg-gradient-to-br from-white/8 to-white/3 border border-white/15 rounded-3xl p-7 transition-all duration-500 shadow-xl hover:border-white/30">
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-pink-600/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-all duration-300" />
                                        <Shield className="w-6 h-6 text-purple-300 relative flex-shrink-0" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white">Protocol</h3>
                                        <p className="text-xs text-white/60 mt-1">Complaint handling guidelines</p>
                                    </div>
                                </div>

                                <div className="space-y-4 text-sm text-white/75">
                                    <div className="flex gap-3">
                                        <Clock className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                                        <p>Initial acknowledgment within 24 hours</p>
                                    </div>
                                    <div className="flex gap-3">
                                        <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                                        <p>Investigation by designated authority</p>
                                    </div>
                                    <div className="flex gap-3">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                                        <p>Resolution within 5-7 working days</p>
                                    </div>
                                    <div className="flex gap-3">
                                        <Phone className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                                        <p>Regular updates on complaint status</p>
                                    </div>
                                </div>
                            </div>

                            <div className="group backdrop-blur-2xl bg-gradient-to-br from-white/8 to-white/3 border border-white/15 rounded-3xl p-7 transition-all duration-500 shadow-xl hover:border-white/30">
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/30 to-teal-600/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-all duration-300" />
                                        <Lock className="w-6 h-6 text-emerald-300 relative flex-shrink-0" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white">Confidentiality</h3>
                                        <p className="text-xs text-white/60 mt-1">Data protection assurance</p>
                                    </div>
                                </div>

                                <div className="space-y-3 text-sm text-white/75">
                                    <p className="leading-relaxed">
                                        Your complaint and personal information are treated with strict confidentiality as per institutional policy.
                                    </p>
                                    <p className="leading-relaxed">
                                        We maintain a zero-tolerance policy against retaliation for lodging legitimate complaints.
                                    </p>
                                </div>
                            </div>

                            <div className="group backdrop-blur-2xl bg-gradient-to-br from-white/8 to-white/3 border border-white/15 rounded-3xl p-7 transition-all duration-500 shadow-xl hover:border-white/30">
                                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                    <div className="p-2 bg-gradient-to-br from-blue-500/30 to-cyan-600/20 rounded-lg">
                                        <Mail className="w-5 h-5 text-blue-300" />
                                    </div>
                                    Need Help?
                                </h3>

                                <div className="space-y-4 text-sm">
                                    <div className="p-4 rounded-xl bg-gradient-to-br from-white/5 to-white/2 border border-white/10 hover:border-white/20 transition-all">
                                        <p className="text-white/50 text-[10px] font-bold mb-1 uppercase tracking-widest">Email Support</p>
                                        <p className="text-white font-semibold">support@tbgpolytechnic.edu</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-gradient-to-br from-white/5 to-white/2 border border-white/10 hover:border-white/20 transition-all">
                                        <p className="text-white/50 text-[10px] font-bold mb-1 uppercase tracking-widest">Emergency Hotline</p>
                                        <p className="text-white font-semibold">+91 (XXX) XXX-XXXX</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RaiseComplaint;