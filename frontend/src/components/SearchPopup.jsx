const SearchPopup = ({ setState }) => {
   return (
      <div className="search-popup">
         <span className="search-back-drop" />
         <button className="close-search" onClick={() => setState((prev) => ({ ...prev, openSearchModal: !prev.openSearchModal }))}>
            <span className="fa fa-times" />
         </button>

         <div className="search-inner">
            <form method="post" action="blog-showcase.html">
               <div className="form-group">
                  <input type="search" name="search-field" placeholder="Search..." />
                  <button type="submit">
                     <i className="fa fa-search" />
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
};
export default SearchPopup;
