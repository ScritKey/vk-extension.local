import getImageList from './status/getImageList';
import getImage from './status/getImage';
import setImage from './status/setImage';
import getWallUploadServer from './photos/getWallUploadServer';
import getFriends from './friends/get';

const ex = {
    // "status.getImageList": getImageList,
    // "status.getImage": getImage,
    // "status.setImage": setImage,

    "photos.getWallUploadServer": getWallUploadServer,

    "friends.get": getFriends,
};

export default ex;