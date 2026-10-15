import { useRef, useState } from "react"
import { useInterviewReport } from "../features/ai/hooks/useInterviewReport"
import { useNavigate } from 'react-router-dom';
const MAX_FILE_SIZE = 3 * 1024 * 1024

export const Home = () => {

    const { loading, reports, generateInterviewReport } = useInterviewReport()

    console.log(reports)
    const [selfDescription, setSelfDescription] = useState("");
    const [jobDescription, setJobDescription] = useState("");

    const fileInputRef = useRef(null)
    const [resume, setResume] = useState(null)
    const [isDragging, setIsDragging] = useState(false)
    const [error, setError] = useState("")
    const [isSubmitted, setIsSubmitted] = useState(false)

    const navigate = useNavigate()

    const acceptFile = (file) => {
        if (!file) return

        const isSupported = ["application/pdf"].includes(file.type)
        if (!isSupported) {
            setError("Please upload a PDF file.")
            return
        }

        if (file.size > MAX_FILE_SIZE) {
            setError("Your resume must be smaller than 3 MB.")
            return
        }

        setResume(file)
        setError("")
        setIsSubmitted(false)
    }

    const handleDrop = (event) => {
        event.preventDefault()
        setIsDragging(false)
        acceptFile(event.dataTransfer.files[0])
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!resume) {
            setError("Add your resume before starting the analysis.")
            return
        }

        const response = await generateInterviewReport({ resume, selfDescription, jobDescription });
        setIsSubmitted(true)
        navigate(`/report/${response._id}`);
    }

    return (
        <main className="min-h-screen overflow-hidden bg-[#f3f0e9] text-[#17202c]">
            <div className="mx-auto max-w-7xl px-5 pb-16 pt-6 sm:px-8 lg:px-12">

                {/* Navbar */}

                <nav className="flex items-center justify-between border-b border-[#17202c]/15 pb-5">

                    {/* Logo */}
                    <a className="flex items-center gap-3" href="/" aria-label="CareerLens home">
                        <span className="grid h-9 w-9 place-items-center rounded-full bg-[#2452d8] text-sm font-black text-white">C</span>
                        <span className="text-sm font-bold tracking-[0.18em]">CAREERLENS</span>
                    </a>

                    {/* Name */}
                    <span className="hidden text-xs font-semibold uppercase tracking-[0.18em] text-[#17202c]/55 sm:block">AI-powered career clarity</span>

                    <span className="h-2 w-2 rounded-full bg-[#f06449] sm:hidden" aria-hidden="true" />
                </nav>


                <section className="grid gap-12 pb-8 pt-14 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-20 lg:pt-6">

                    <header className="animate-fade-up ">

                        <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-[#2452d8]">
                            <span className="h-px w-8 bg-[#2452d8]" /> Resume intelligence
                        </p>

                        <h1 className="max-w-xl font-serif text-5xl leading-[0.95] tracking-[-0.04em] sm:text-7xl">Make your next move <em className="font-normal text-[#2452d8]">count.</em></h1>

                        <p className="mt-7 max-w-md text-base leading-7 text-[#17202c]/65 sm:text-lg">Share the context behind your experience. We&apos;ll surface the story your resume is already telling and show you how to make it sharper.</p>

                        <div className="mt-9 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.15em] text-[#17202c]/50">
                            <span className="grid h-8 w-8 place-items-center rounded-full border border-[#17202c]/20">01</span>
                            <span>Three inputs. One clearer direction.</span>
                        </div>
                    </header>

                    <form className="animate-fade-up animation-delay-150 rounded-4xl border border-[#17202c]/10 bg-[#fffdf8] p-5 shadow-[0_24px_70px_rgba(23,32,44,0.10)] sm:p-8" onSubmit={handleSubmit}>

                        <div className="mb-8 flex items-start justify-between gap-4 border-b border-[#17202c]/10 pb-6">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#f06449]">Start here</p>
                                <h2 className="mt-2 font-serif text-3xl tracking-[-0.03em]">Build your analysis</h2>
                            </div>
                            {/* <span className="text-xs font-bold text-[#17202c]/35">1 / 3</span> */}
                        </div>

                        <div className="space-y-7">
                            <div>
                                <div className="mb-3 flex items-center justify-between">
                                    <label className="text-sm font-bold" htmlFor="resume-upload">Your resume <span className="font-normal text-[#17202c]/40">(required)</span></label>
                                    <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#17202c]/40">PDF</span>
                                </div>

                                <input ref={fileInputRef} className="sr-only"
                                    id="resume-upload"
                                    type="file"
                                    accept=".pdf"
                                    onChange={(event) => acceptFile(event.target.files[0])} />

                                <div className={`group relative rounded-2xl border-2 border-dashed p-5 text-center transition-all duration-300 sm:p-7 ${isDragging ? "scale-[1.01] border-[#2452d8] bg-[#eef2ff]" : "border-[#17202c]/20 hover:border-[#2452d8] hover:bg-[#f7f8ff]"}`} onDragEnter={(event) => { event.preventDefault(); setIsDragging(true) }} onDragOver={(event) => event.preventDefault()} onDragLeave={() => setIsDragging(false)} onDrop={handleDrop}>
                                    {resume ? (
                                        <div className="flex items-center justify-between gap-3 text-left">
                                            <div className="flex min-w-0 items-center gap-3">
                                                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#eef2ff] text-xs font-black text-[#2452d8]">CV</span>
                                                <div className="min-w-0"><p className="truncate text-sm font-bold">{resume.name}</p><p className="mt-1 text-xs text-[#17202c]/50">{(resume.size / 1024 / 1024).toFixed(2)} MB · Ready to scan</p></div>
                                            </div>
                                            <button className="shrink-0 text-xs font-bold text-[#f06449] hover:underline" type="button" onClick={() => { setResume(null); setError("") }}>Remove</button>
                                        </div>
                                    ) : (
                                        <button className="w-full" type="button" onClick={() => fileInputRef.current?.click()}><span className="mx-auto mb-3 grid h-11 w-11 place-items-center rounded-full bg-[#17202c] text-lg text-white transition-transform duration-300 group-hover:-translate-y-1">↑</span><span className="block text-sm font-bold">Drop your resume here</span><span className="mt-1 block text-xs text-[#17202c]/50">or <span className="text-[#2452d8] underline underline-offset-2">browse your files</span></span></button>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="mb-3 block text-sm font-bold" htmlFor="self-description">A little about you <span className="font-normal text-[#17202c]/40">(optional)</span></label>
                                <textarea className="min-h-28 w-full resize-y rounded-2xl border border-[#17202c]/15 bg-transparent px-4 py-3 text-sm outline-none transition placeholder:text-[#17202c]/35 focus:border-[#2452d8] focus:ring-4 focus:ring-[#2452d8]/10"
                                    value={selfDescription}
                                    onChange={(e) => { setSelfDescription(e.target.value) }}
                                    id="selfDescription"
                                    placeholder="What are you good at? What kind of work energizes you?" />
                            </div>

                            <div>
                                <label className="mb-3 block text-sm font-bold" htmlFor="job-description">The role you&apos;re aiming for</label>
                                <textarea className="min-h-28 w-full resize-y rounded-2xl border border-[#17202c]/15 bg-transparent px-4 py-3 text-sm outline-none transition placeholder:text-[#17202c]/35 focus:border-[#2452d8] focus:ring-4 focus:ring-[#2452d8]/10"
                                    value={jobDescription}
                                    onChange={(e) => { setJobDescription(e.target.value) }}
                                    id="jobDescription"
                                    placeholder="Paste the job description or tell us what you&apos;re looking for..." />
                            </div>
                        </div>

                        {error && <p className="mt-5 text-sm font-semibold text-[#d94b35]" role="alert">{error}</p>}
                        {isSubmitted && <p className="mt-5 text-sm font-semibold text-[#2452d8]" role="status">Your profile is ready. Analysis will begin shortly.</p>}
                        <button className="mt-7 flex w-full items-center justify-between rounded-xl bg-[#2452d8] px-5 py-4 text-left text-sm font-bold text-white transition hover:bg-[#183eb1] focus:outline-none focus:ring-4 focus:ring-[#2452d8]/25" type="submit"><span>Analyze my profile</span><span aria-hidden="true">↗</span></button>
                    </form>
                </section>


                {reports.length > 0 && (
                    <section className="mt-10 w-full rounded-2xl border border-[#17202c]/15 bg-[#fffdf8] p-6">
                        <h2 className="mb-5 text-xl font-bold">
                            My Recent Interview Plans
                        </h2>

                        <ul className="space-y-3">
                            {reports.map((report) => (
                                <li
                                    key={report._id}
                                    className="rounded-xl border border-[#17202c]/10 p-4"
                                >
                                    <h3 className="font-bold">
                                        {report.title || "Untitled Position"}
                                    </h3>

                                    <p className="mt-1 text-sm text-[#17202c]/60">
                                        {report.createdAt
                                            ? new Date(report.createdAt).toLocaleDateString()
                                            : "Date unavailable"}
                                    </p>

                                    <button
                                        type="button"
                                        onClick={() => navigate(`/report/${report._id}`)}
                                        className="mt-3 text-sm font-semibold text-[#2452d8] hover:underline"
                                    >
                                        View report →
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

            </div>
        </main>
    )
}