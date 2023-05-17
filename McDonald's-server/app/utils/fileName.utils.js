import { v4 as uuidv4 } from 'uuid';

export const createFileName = params => {
	const fileName = uuidv4() + '.png';
	images.mv(path.resolve(__dirname, '.', `uploads/${params}`, fileName));
	return fileName;
};
