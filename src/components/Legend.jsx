import React from "react";

import {
  COLOR_CLOSED,
  COLOR_OPEN,
  COLOR_PATH,
  COLOR_TEMP_PATH,
  COLOR_FACE,
} from "./Cell";

const legendData = [
  {
    style: { backgroundColor: COLOR_OPEN },
    data: "Open (default unset node)",
  },
  {
    style: { backgroundColor: COLOR_CLOSED },
    data: "Closed or barrier node",
  },
  {
    style: { backgroundColor: COLOR_FACE },
    data: "Start and end node",
  },
  {
    style: { backgroundColor: COLOR_TEMP_PATH },
    data: "Temporary path",
  },
  {
    style: { backgroundColor: COLOR_PATH },
    data: "Final path",
  },
];

export default function Legend() {
  return (
    <details open>
      <summary>Legend</summary>
      <div className="legend">
        {legendData.map((ld, i) => (
          <div className="legend-cell" key={i}>
            <div style={ld.style}></div>
            <span>{ld.data}</span>
          </div>
        ))}
      </div>

      <div className="info">
        This algorithm is built in way it vividly illustrates the myriad
        potential pathways a nimble rat can traverse within a square maze,
        replete with immovable obstructions strategically placed. The maze
        itself is a meticulously crafted arena, with dimensions measuring N x N.
        It presents a formidable challenge, with designated starting and
        concluding points situated at the top-left and bottom-right cells,
        respectively. Some cells grant passage, while others serve as unwavering
        barriers, creating a compelling puzzle for the rat to unravel.
        <br></br>The rat's movement adheres to strict rules: it can advance only
        one step at a time, it can execute movements in either backward,
        rightward, downward, or upward directions . As the rat embarks on its
        odyssey from the initial vertex to the ultimate destination, this
        application undertakes the intricate task of determining the feasibility
        of reaching the destination. Once established, the application
        meticulously traces and marks the correct pathways that lead the rat to
        its victorious journey's end.. <br></br>
      </div>
    </details>
  );
}
