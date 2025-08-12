const Play_youtube = ({ hash, embedId }) => {
   return (
      hash && (
         <div
            style={{
               transitionDuration: "500ms",
               position: "fixed",
               top: 0,
               left: 0,
               width: "100%",
               height: "100%",
               zIndex: 99_992,
               WebkitTapHighlightColor: "transparent",
               backfaceVisibility: "hidden",
               transform: "translateZ(0)",
               fontFamily: "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif",
               opacity: 1,
               visibility: "visible",
               transition: "opacity .25s,visibility 0s",
               display: "block",
            }}>
            <div
               style={{
                  opacity: 0.87,
                  transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
                  background: "#1e1e1e",
                  transitionDuration: "inherit",
                  transitionProperty: "opacity",
                  position: "absolute",
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0,
               }}
            />
            <div
               style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0,
               }}>
               <div
                  style={{
                     top: 0,
                     right: 0,
                     margin: 0,
                     padding: 0,
                     position: "absolute",
                     direction: "ltr",
                     zIndex: 99_997,
                     opacity: 0,
                     visibility: "hidden",
                     transition: "opacity .25s,visibility 0s linear .25s",
                     boxSizing: "border-box",
                  }}>
                  <button
                     style={{
                        cursor: "pointer",
                        color: "#ccc",
                        boxSizing: "border-box",
                        display: "inline-block",
                        verticalAlign: "top",
                        width: 44,
                        height: 44,
                        margin: 0,
                        padding: 10,
                        border: 0,
                        borderRadius: 0,
                        background: "rgba(30,30,30,.6)",
                        transition: "color .3s ease",
                        WebkitAppearance: "button",
                        textTransform: "none",
                        fontFamily: "inherit",
                        fontSize: "inherit",
                        lineHeight: "inherit",
                     }}
                     title="Close">
                     <svg
                        viewBox="0 0 40 40"
                        style={{
                           display: "block",
                           position: "relative",
                           overflow: "visible",
                           shapeRendering: "geometricPrecision",
                           verticalAlign: "middle",
                        }}>
                        <path
                           d="M10,10 L30,30 M30,10 L10,30"
                           style={{
                              fill: "currentColor",
                              stroke: "currentColor",
                              strokeLinejoin: "round",
                              strokeWidth: 3,
                           }}
                        />
                     </svg>
                  </button>
               </div>
               <div
                  style={{
                     overflow: "hidden",
                     direction: "ltr",
                     zIndex: 99_994,
                     WebkitTransform: "translateZ(0)",
                     position: "absolute",
                     top: 0,
                     right: 0,
                     bottom: 0,
                     left: 0,
                  }}>
                  <div
                     style={{
                        display: "block",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        margin: 0,
                        padding: 0,
                        overflow: "auto",
                        outline: "none",
                        whiteSpace: "normal",
                        boxSizing: "border-box",
                        textAlign: "center",
                        zIndex: 99_994,
                        backfaceVisibility: "hidden",
                        transitionProperty: "transform,opacity,-webkit-transform",
                     }}>
                     <div style={{ content: "", display: "inline-block", verticalAlign: "middle", height: "100%", width: 0 }} />
                     <div
                        style={{
                           padding: 0,
                           width: "80%",
                           height: "80%",
                           maxWidth: "calc(100% - 100px)",
                           maxHeight: "calc(100% - 88px)",
                           overflow: "visible",
                           background: "#fff",
                           display: "inline-block",
                           position: "relative",
                           margin: "44px 0",
                           borderWidth: 0,
                           verticalAlign: "middle",
                           textAlign: "left",
                           boxSizing: "border-box",
                        }}>
                        <iframe
                           title="YouTube video player"
                           style={{
                              background: "#000",
                              margin: 0,
                              width: "100%",
                              display: "block",
                              padding: 0,
                              height: "100%",
                              border: "none",
                           }}
                           src={`https://www.youtube.com/embed/${embedId}`}
                        />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      )
   );
};
export default Play_youtube;
