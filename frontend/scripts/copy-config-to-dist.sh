DIST_FOLDER="./dist"
CONFIG_FOLDER="./src/assets/config"
if [ ! -d "${DIST_FOLDER}" ]; then
  echo making ${DIST_FOLDER}
  mkdir ${DIST_FOLDER}
fi 
if [ ! -d "${DIST_FOLDER}/assets" ]; then
  echo making ${DIST_FOLDER}/assets
  mkdir ${DIST_FOLDER}/assets
fi 
if [ ! -d "${DIST_FOLDER}/assets/config" ]; then
  echo making ${DIST_FOLDER}/assets/config
  mkdir ${DIST_FOLDER}/assets/config
fi 
cp ${CONFIG_FOLDER}/* ${DIST_FOLDER}/assets/config
