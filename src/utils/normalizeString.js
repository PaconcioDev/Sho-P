function normalizeString (string) {
  return string.toLowerCase().split(' ').join('-');
}

export { normalizeString };
