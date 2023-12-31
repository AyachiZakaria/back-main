const multer = require('multer');
const { diskStorage } = require('multer');
const { join, dirname } = require('path');

// Les extensions à accepter
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/mp4': 'mp4',
};

module.exports = multer({
  // Configuration de stockage
  storage: diskStorage({
    // Configurer l'emplacement de stockage
    destination: (req, file, callback) => {
      const currentDir = dirname(__filename); // Récupérer le chemin du dossier courant
      callback(null, join(currentDir, '../public/images')); // Indiquer l'emplacement de stockage
    },
    // Configurer le nom avec lequel le fichier va être enregistré
    filename: (req, file, callback) => {
      // Remplacer les espaces par des underscores
      const name = file.originalname.split(' ').join('_');
      // Récupérer l'extension à utiliser pour le fichier
      const extension = MIME_TYPES[file.mimetype];
      // Ajouter un timestamp Date.now() au nom de fichier
      callback(null, name + Date.now() + '.' + extension);
    },
  }),
  // Taille max des images 10Mo
  limits: 10 * 1024 * 1024,
}).single('media');
