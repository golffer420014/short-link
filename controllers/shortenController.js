const { isValidUrl, isValidCustomCode, generateUniqueCode } = require('../utils/urlUtils');
const { loadUrlsFromFile, saveUrlsToFile } = require('../utils/fileUtils');

let urls = loadUrlsFromFile();

exports.shortenUrl = (req, res) => {
  const { url, customCode } = req.body;

  if (!url || !isValidUrl(url)) {
    return res.status(400).json({ error: 'Invalid or missing URL.' });
  }

  let code;

  if (customCode) {
    if (!isValidCustomCode(customCode)) {
      return res.status(400).json({
        error: 'Custom code must be 3-32 characters and contain only letters, numbers, underscores, or hyphens.'
      });
    }
    if (urls[customCode]) {
      return res.status(409).json({ error: 'Custom code already exists. Please choose another.' });
    }
    code = customCode;
  } else {
    code = generateUniqueCode(urls);
  }

  urls[code] = url;
  saveUrlsToFile(urls);

  return res.status(201).json({ shortUrl: `${req.protocol}://${req.get('host')}/${code}` });
};

exports.redirectUrl = (req, res) => {
  const { code } = req.params;
  const url = urls[code];

  if (url) {
    return res.redirect(url);
  }

  return res.status(404).json({ error: 'Short URL not found.' });
};
