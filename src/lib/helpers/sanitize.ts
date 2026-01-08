export const sanitizePlainText = (
  input: string | null | undefined
): string => {
  if (input == null) return "";

  let value = String(input);

  // Remove <script> tags and their content
  value = value.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "");

  // Strip any remaining HTML tags
  value = value.replace(/<\/?[^>]+(>|$)/g, "");

  // Decode common HTML entities that might appear in text content
  value = value.replace(/&nbsp;/gi, " ");

  // Remove control characters
  value = value.replace(/[\u0000-\u001F\u007F]/g, "");

  // Collapse multiple whitespace characters into a single space
  value = value.replace(/\s+/g, " ");

  return value.trim();
};


