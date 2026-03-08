import { fetchImagesFromR2 } from '../actions/fetchImages';
import GalleryClient from '../components/GalleryClient';

export default async function ChildrenBookIllustrationsPage() {
  const folderName = 'children-book-illustrations/';
  const images = await fetchImagesFromR2(folderName);

  return <GalleryClient images={images} title="Children Book Illustrations" />;
}