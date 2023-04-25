import DataUriParser from 'datauri/parser.js'
import path from 'path'

const getDataUri = (file) => {
  console.log("datauri",file)
    const parser = new DataUriParser();
    // file in param contains several properties like original name and buffer , multer has provided this property
    // console.log(file)
    console.log("datauri 2")

    const extName = path.extname(file.originalname).toString();
    return parser.format(extName, file.buffer);
  };

export default getDataUri