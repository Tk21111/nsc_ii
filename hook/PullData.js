//exaple only
const [content, setContent] = useState(null);
const writeFile = () => {
   var path = RNFS.DocumentDirectoryPath + '/test.txt';
   RNFS.writeFile(path, 'This is a content from Waldo', 'utf8')
    .then(() => console.log('FILE WRITTEN!'))
    .catch((err) => console.log(err.message));
}
const readFile = () => {
   RNFS.readDir(RNFS.DocumentDirectoryPath)
    .then((result) => {
    console.log('GOT RESULT', result);
    return Promise.all([RNFS.stat(result[0].path), result[0].path]);
  })
  .then((statResult) => {
   if (statResult[0].isFile()) {
    return RNFS.readFile(statResult[1], 'utf8');
 }
 return 'no file';
 })
 .then((contents) => {
  setContent(contents);
  console.log(contents);
 })
  .catch((err) => {
   console.log(err.message, err.code);
  });
}
const deleteFile = () => {
    var path = RNFS.DocumentDirectoryPath + '/test.txt';
    return RNFS.unlink(path)
      .then(() => {
        console.log('FILE DELETED');
        setContent(null);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };