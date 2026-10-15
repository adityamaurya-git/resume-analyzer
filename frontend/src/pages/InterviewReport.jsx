import { useEffect, useMemo, useState } from "react"
import { useParams } from "react-router-dom"
import { useInterviewReport } from "../features/ai/hooks/useInterviewReport"

const tabs = [
    { key: "technicalQuestions", label: "Technical", shortLabel: "Tech", icon: "01" },
    { key: "behavioralQuestions", label: "Behavioral", shortLabel: "Behavior", icon: "02" },
    { key: "preparationPlan", label: "Preparation", shortLabel: "Plan", icon: "03" },
    { key: "skillGap", label: "Skill gaps", shortLabel: "Gaps", icon: "04" },
]

// const formatDate = (date) => date ? new Intl.DatzeTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date(date)) : ""

const QuestionCard = ({ item, index }) => (
    <article className="border-b border-[#17202c]/10 py-7 first:pt-1 last:border-0">

        <div className="flex gap-4">

            <span className="mt-1 shrink-0 font-mono text-xs font-bold text-[#f06449]">0{index + 1}</span>

            <div className="min-w-0">
                <h3 className="text-lg font-bold leading-snug tracking-[-0.02em] text-[#17202c]">{item.question}</h3>
                <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-[#2452d8]">What they are looking for</p>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-[#17202c]/60">{item.intention}</p>
                <div className="mt-5 border-l-2 border-[#f06449]/35 pl-4">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#17202c]/40">Suggested answer</p>
                    <p className="mt-2 text-sm leading-7 text-[#17202c]/80">{item.answer}</p>
                </div>
            </div>
        </div>
    </article>
)

const PreparationCard = ({ item }) => (
    <article className="border-b border-[#17202c]/10 py-7 first:pt-1 last:border-0">
        <div className="flex gap-4">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#2452d8] text-sm font-black text-white">{item.day}</span>
            <div>
                <h3 className="text-lg font-bold tracking-[-0.02em]">{item.focus}</h3>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-[#17202c]/65">
                    {
                        item.tasks?.map((task) =>
                            <li className="flex gap-3" key={task}>
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#f06449]" />{task}
                            </li>)
                    }
                </ul>
            </div>
        </div>
    </article>
)

const SkillGapCard = ({ item }) => (
    <article className="flex items-center justify-between gap-5 border-b border-[#17202c]/10 py-6 first:pt-1 last:border-0">
        <p className="text-base font-bold leading-6">{item.skill}</p>
        <span className={`shrink-0 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] ${item.severity === "high" ? "bg-[#f06449]/15 text-[#c84932]" : item.severity === "medium" ? "bg-[#f4c95d]/25 text-[#9a7110]" : "bg-[#2452d8]/10 text-[#2452d8]"}`}>{item.severity}</span>
    </article>
)

export const InterviewReport = () => {
    const { interviewId } = useParams()
    
    const { loading, report, getInterviewReportById } = useInterviewReport()
    const [activeTab, setActiveTab] = useState("technicalQuestions")

    useEffect(() => {
        if (interviewId && (!report || report._id !== interviewId)) {
            getInterviewReportById(interviewId)
        }
    }, [interviewId])

    const activeItems = useMemo(() => report?.[activeTab] || [], [report, activeTab])
    const activeTabDetails = tabs.find((tab) => tab.key === activeTab)

    if (loading || !report) {
        return (
            <main className="grid min-h-screen place-items-center bg-[#f3f0e9] px-6 text-[#17202c]">
                <div className="text-center">
                    <span className="mx-auto mb-4 block h-10 w-10 animate-spin rounded-full border-2 border-[#17202c]/15 border-t-[#2452d8]" />
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#17202c]/50">Preparing your report</p>
                </div>
            </main>
        )

    }

    return (
        <main className="min-h-screen overflow-hidden bg-[#f3f0e9] text-[#17202c]">
            <div className="mx-auto max-w-375 px-5 pb-16 pt-6 sm:px-8 lg:px-12">
                <header className="flex flex-wrap items-end justify-between gap-5 border-b border-[#17202c]/15 pb-6">
                    <div>
                        <a className="mb-7 flex items-center gap-3" href="/" aria-label="CareerLens home"><span className="grid h-9 w-9 place-items-center rounded-full bg-[#2452d8] text-sm font-black text-white">C</span><span className="text-sm font-bold tracking-[0.18em]">CAREERLENS</span></a>
                        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#f06449]">Interview intelligence</p>
                        <h1 className="max-w-3xl font-serif text-4xl leading-none tracking-[-0.04em] sm:text-6xl">Your <em className="font-normal text-[#2452d8]">next chapter</em>, mapped.</h1>
                    </div>
                    {/* <div className="text-left sm:text-right"><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#17202c]/40">Generated</p><p className="mt-1 text-sm font-bold">{formatDate(report.createdAt)}</p></div> */}
                </header>

                <div className="mt-8 grid gap-8 xl:grid-cols-[220px_minmax(0,1fr)_300px] xl:items-start xl:gap-12">
                    <nav className="flex gap-2 overflow-x-auto pb-1 xl:block xl:space-y-2 xl:overflow-visible" aria-label="Report sections">
                        <p className="mb-3 hidden text-[10px] font-black uppercase tracking-[0.2em] text-[#17202c]/40 xl:block">
                            Explore your report
                        </p>
                        {
                            tabs.map((tab) => 
                                <button key={tab.key} 
                                    className={`flex min-w-max items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-bold transition ${activeTab === tab.key ? "bg-[#17202c] text-white shadow-[0_10px_25px_rgba(23,32,44,0.12)]" : "text-[#17202c]/55 hover:bg-white/60 hover:text-[#17202c]"}`} 

                                    onClick={() => setActiveTab(tab.key)} type="button">
                                        <span className={`font-mono text-[10px] ${activeTab === tab.key ? "text-[#f4c95d]" : "text-[#17202c]/30"}`}>{tab.icon}
                                        </span>
                                        <span className="sm:hidden xl:inline">{tab.label}</span>
                                        <span className="hidden sm:inline xl:hidden">{tab.shortLabel}</span>
                                </button>
                            )}
                    </nav>

                    <section className="min-w-0 rounded-3xl border border-[#17202c]/10 bg-[#fffdf8] px-5 py-6 shadow-[0_24px_70px_rgba(23,32,44,0.07)] sm:px-8 sm:py-8" aria-live="polite">
                        <div className="mb-5 border-b border-[#17202c]/10 pb-5">
                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#2452d8]">
                                Section {activeTabDetails?.icon}
                            </p>
                            <h2 className="mt-2 font-serif text-3xl tracking-[-0.03em] sm:text-4xl">
                                {activeTabDetails?.label}
                            </h2>
                            <p className="mt-2 text-sm text-[#17202c]/50">
                                {
                                    activeTab === "technicalQuestions" || activeTab === "behavioralQuestions" ? `${activeItems.length} questions to sharpen before your conversation.` : activeTab === "preparationPlan" ? "A focused seven-day path from insight to readiness." : "The highest-leverage areas to strengthen next."
                                }
                            </p>
                        </div>

                        {activeItems.length === 0 ? 
                            <p className="py-10 text-sm text-[#17202c]/50">No details have been added to this section yet.</p> : activeTab === "preparationPlan" ? activeItems.map((item) => <PreparationCard item={item} key={item.day} />) : activeTab === "skillGap" ? activeItems.map((item) => <SkillGapCard item={item} key={item.skill} />) : activeItems.map((item, index) => <QuestionCard item={item} index={index} key={item.question} />)
                        }
                    </section>

                    <aside className="space-y-5">
                        <section className="relative overflow-hidden rounded-3xl bg-[#2452d8] p-6 text-white shadow-[0_24px_55px_rgba(36,82,216,0.24)]">
                            <span className="absolute -right-8 -top-8 h-28 w-28 rounded-full border-18 border-white/10" />

                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/65">Match score</p>
                            <div className="mt-5 flex items-end gap-2">
                                <span className="font-serif text-7xl leading-none">{report.matchScore}</span>
                                <span className="mb-2 text-2xl text-white/60">%</span>
                            </div>
                            <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/20">
                                <div className="h-full rounded-full bg-[#f4c95d]"
                                    style={{ width: `${Math.min(report.matchScore || 0, 100)}%` }} />
                            </div>
                            <p className="mt-4 text-sm leading-6 text-white/70">A strong foundation. Your preparation plan is designed to turn alignment into confidence.</p>
                        </section>

                        <section className="rounded-3xl border border-[#17202c]/10 bg-[#fffdf8] p-6">
                            <div className="flex items-center justify-between">
                                <h2 className="font-serif text-2xl tracking-[-0.03em]">Skill gap</h2>
                                <span className="text-xs font-bold text-[#f06449]">{report.skillGap?.length || 0} areas</span>
                            </div>
                            <div className="mt-5 space-y-4">
                                {(
                                    report.skillGap || []).slice(0, 4).map((item) =>
                                        <div className="flex items-start gap-3" key={item.skill}>
                                            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#f06449]" />
                                            <p className="text-sm leading-5 text-[#17202c]/70">{item.skill}</p>
                                        </div>
                                    )}
                            </div>
                            <button className="mt-6 text-xs font-black uppercase tracking-[0.14em] text-[#2452d8] hover:underline"
                                onClick={() => setActiveTab("skillGap")}
                                type="button">See all gaps <span aria-hidden="true">↗</span>
                            </button>
                        </section>

                        <section className="border-t border-[#17202c]/15 pt-5">
                            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#17202c]/40">Role analyzed</p>
                            <p className="mt-2 font-serif text-2xl tracking-[-0.03em]">{report.title || "Your target role"}</p>
                        </section>
                    </aside>
                </div>
            </div>
        </main>
    )
}