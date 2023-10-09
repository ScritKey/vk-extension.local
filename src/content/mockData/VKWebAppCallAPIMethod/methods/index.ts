import getImageList from './status/getImageList';
import getImage from './status/getImage';
import setImage from './status/setImage';
import getWallUploadServer from './photos/getWallUploadServer';

const ex = {
    "status.getImageList": getImageList,
    "status.getImage": getImage,
    "status.setImage": setImage,

    "photos.getWallUploadServer": getWallUploadServer,
};

export default ex;