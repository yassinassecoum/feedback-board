export const FilterTag = ({ setCurrentTag, currentTag }: any) => {
    return (
        <div className="wrapFilter">
            <div onClick={() => setCurrentTag("All")} className={currentTag === "All" ? "selectedTag" : "tag"}>
                All
            </div>
            <div onClick={() => setCurrentTag("UI")} className={currentTag === "UI" ? "selectedTag" : "tag"}>
                UI
            </div>
            <div onClick={() => setCurrentTag("UX")} className={currentTag === "UX" ? "selectedTag" : "tag"}>
                UX
            </div>
            <div onClick={() => setCurrentTag("Enhancement")} className={currentTag === "Enhancement" ? "selectedTag" : "tag"}>
                Enhancement
            </div>
            <div onClick={() => setCurrentTag("Bug")} className={currentTag === "Bug" ? "selectedTag" : "tag"}>
                Bug
            </div>
            <div onClick={() => setCurrentTag("Feature")} className={currentTag === "Feature" ? "selectedTag" : "tag"}>
                Feature
            </div>
        </div>
    )
}
