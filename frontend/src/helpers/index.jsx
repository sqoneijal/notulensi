const PreLoader = () => {
   return (
      <div className="preloader">
         <svg className="pl1" height="128px" viewBox="0 0 128 128" width="128px">
            <defs>
               <linearGradient id="pl-gradient" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0%" stopColor="#D51C55" />
                  <stop offset="100%" stopColor="#9914CB" />
               </linearGradient>
            </defs>
            <g className="pl1__g">
               <g transform="translate(20,20) rotate(0,44,44)">
                  <g className="pl1__rect-g">
                     <rect height="40" width="40" className="pl1__rect" rx="8" ry="8" />
                     <rect height="40" width="40" className="pl1__rect" rx="8" ry="8" transform="translate(0,48)" />
                  </g>
                  <g className="pl1__rect-g" transform="rotate(180,44,44)">
                     <rect height="40" width="40" className="pl1__rect" rx="8" ry="8" />
                     <rect height="40" width="40" className="pl1__rect" rx="8" ry="8" transform="translate(0,48)" />
                  </g>
               </g>
            </g>
         </svg>
      </div>
   );
};

export { PreLoader };
