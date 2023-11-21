export function extractAndFormatFileName(inputString, foo) {
  const lastSlashIndex = inputString.lastIndexOf('/');
  const lastDotIndex = inputString.lastIndexOf('.');

  if (lastSlashIndex >= 0 && lastDotIndex > lastSlashIndex) {
    const extracted = inputString.substring(lastSlashIndex + 1, lastDotIndex);
    const formatted = extracted
      .replace(/_/g, ' ')
      .replace(/\b\w/g, firstLetter => firstLetter.toUpperCase());

    return formatted;
  } else {
    return '';
  }
}

export function getAlbumName(input) {
  const parts = input.split('/');
  const lastPart = parts[parts.length - 1];
  const fileName = lastPart.split('.')[0];

  const formattedString = fileName.replace('_', ' ');

  return formattedString;
}
