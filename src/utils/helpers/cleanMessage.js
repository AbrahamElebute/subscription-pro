const cleanMessage = (msg = "") => {
  // Remove quotes around field names like: '"paymentMethod" is required'
  return msg.replace(/^"(.+)"\s/, (_, field) => {
    // Convert camelCase or snake_case to Proper Case
    const prettyField = field
      .replace(/([A-Z])/g, " $1")
      .replace(/[_\-]/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
    return `${prettyField} `;
  });
};

export default cleanMessage;
