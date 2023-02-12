import { atom } from "recoil";

export const userState = atom({
	key: 'userState',
	default: {
		isFetching: false,
		exists: false,
		username: '',
		data: {}
	},
});

export const userDataGistsState = atom({
	key: 'userDataGistsState',
	default: {
		isFetching: false,
		data: {}
	},
});
