import { fetchImagesFromR2 } from '../actions/fetchImages';
import BookIllustrationsClient from './BookIllustrationsClient';

export default async function BookIllustrationsPage() {
  const folderName = 'children-book-illustrations/';
  const imageKeys = await fetchImagesFromR2(folderName);

  return <BookIllustrationsClient initialImageKeys={imageKeys} />;
}
