const stripTags = (input) => {
   return input.replace(/<\/?[^>]+(>|$)/g, "");
};

const potongString = (text, maxLength) => {
   if (text.length <= maxLength) return text;
   const trimmed = text.slice(0, maxLength);
   const lastSpace = trimmed.lastIndexOf(" ");
   return `${trimmed.slice(0, lastSpace)}...`;
};

export { potongString, stripTags };
