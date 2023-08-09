const { atom, selector  } = require('recoil');
import { v1 } from 'uuid';

const authState = atom({
    key: `authState_${v1()}`,
    default: {
        check: false
    },
});

export { authState }