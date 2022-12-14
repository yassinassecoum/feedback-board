import React from 'react'

export const Roadmap = () => {
    return (
        <div className="wrapRoadmap">
            <div className="titleRoad">
                <h3 className="titleRoad"> Roadmap</h3>
                <a className="linkRoadmap" href="/main">View</a>
            </div>
            <div className="contentRoad">
                <div className="roadmapElem">
                    <div className="wrapElem">
                        <div className="orange"></div>
                        <p className="roadmapLabel">Planned</p>
                    </div>
                    <p className="bold">3</p>
                </div>
                <div className="roadmapElem">
                    <div className="wrapElem">
                        <div className="purple"></div>
                        <p className="roadmapLabel">In-Progress</p>
                    </div>
                    <p className="bold">2</p>
                </div>
                <div className="roadmapElem">
                    <div className="wrapElem">
                        <div className="blue"></div>
                        <p className="roadmapLabel">Live</p>
                    </div>
                    <p className="bold">1</p>
                </div>
            </div>
        </div>
    )
}
