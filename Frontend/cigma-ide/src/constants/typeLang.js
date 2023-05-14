export const typeLang = (type) => {
  switch (type) {
    case "js":
    case "jsx":
      return "javascript";
    case "ts":
    case "tsx":
      return "typescript";
    case "css":
      return "css";
    case "scss":
      return "scss";
    case "sass":
      return "sass";
    case "html":
    case "htm":
    case "HTML":
      return "html";
    case "json":
      return "json";
    case "xml":
    case "XML":
      return "xml";
    case "php":
    case "PHP":
      return "php";
    case "md":
      return "markdown";
    case "java":
      return "java";
    case "py":
      return "python";
    default:
      return "text";
  }
};
