const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");

const storageTypes = {
  local: multer.diskStorage({
    destination: path.resolve(__dirname, "..", "..", "tmp", "uploads"),
    filename(request, file, callback) {
      const hash = crypto.randomBytes(6).toString("hex");
      const fileName = `${hash}-${file.originalname}`;
      callback(null, fileName);
    },
  }),

  s3: multerS3({
    s3: new aws.S3(),
    bucket: "medradar",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    key: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err);

        const fileName = `${hash.toString("hex")}-${file.originalname}`;

        cb(null, fileName);
      });
    },
  }),
};


/*Limitar tamanho e tipo de arquivo */

module.exports = {
  dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
  storage: storageTypes[process.env.STORAGE_TYPE],
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
        'image/jpeg',
        'image/pjpeg',
        'image/jpg',
        'image/png',
    ];

    if (allowedMimes.includes(file.mimetype)){
        cb(null, true);
    } else {
        cb(new Error('Invalid file type'));
    }
  },
};
