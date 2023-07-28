// check if a string is a valid JSON

export default function isValidJson(str: string | File) {
  try {
    if (typeof str === "string") {
      JSON.parse(str);
      return true;
    }
    return false;
  } catch (e) {
    return false;
  }
}
