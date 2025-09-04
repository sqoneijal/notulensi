const isKategori1 = (content, is_admin) => {
   if (is_admin) {
      return true;
   }

   return content.length > 0 && content[0]?.posisi?.kategori === 3;
};

function getHashValue(url) {
   const hash = url.split("#")[1];
   return hash ? hash.split("&")[0] : null;
}

export { getHashValue, isKategori1 };
