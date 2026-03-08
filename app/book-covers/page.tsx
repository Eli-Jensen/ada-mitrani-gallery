import { fetchImagesFromR2 } from '../actions/fetchImages';
import GalleryClient from '../components/GalleryClient';

export default async function BookCoversPage() {
  const folderName = 'book-covers/';
  const images = await fetchImagesFromR2(folderName);

  return <GalleryClient images={images} title="Book Covers"/>;
}