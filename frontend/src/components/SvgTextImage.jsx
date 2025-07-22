import "@fontsource/dancing-script";

import { useEffect, useRef, useState } from "react";

const SvgTextImage = ({ text = null, fontSize = 48, color = "white", padding = 20 }) => {
   const textRef = useRef(null);
   const [textWidth, setTextWidth] = useState(0);

   useEffect(() => {
      if (textRef.current) {
         const bbox = textRef.current.getBBox();
         setTextWidth(bbox.width + padding * 2); // tambahkan padding kiri-kanan
      }
   }, [text, padding]);

   return (
      <svg width={textWidth} height={fontSize * 2} xmlns="http://www.w3.org/2000/svg">
         <style>{`
        .handwriting {
          font-family: 'Dancing Script', cursive;
          font-size: ${fontSize}px;
          fill: ${color};
        }
      `}</style>
         <text ref={textRef} x={padding} y={fontSize + padding / 2} className="handwriting">
            {text}
         </text>
      </svg>
   );
};

export default SvgTextImage;
