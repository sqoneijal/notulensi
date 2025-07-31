const isKategori1 = (content, is_admin) => {
   if (is_admin) {
      return true;
   }

   return content.length > 0 && content?.posisi?.kategori === 1;
};

export { isKategori1 };
