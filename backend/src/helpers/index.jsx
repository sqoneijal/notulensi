const isKategori1 = (content, is_admin) => {
   if (is_admin) {
      return true;
   }

   return content.length > 0 && content[0]?.posisi?.kategori === 3;
};

export { isKategori1 };
