import { fetchImagesFromR2 } from '../actions/fetchImages';
import GalleryClient from '../components/GalleryClient';

export default async function PoetryIllustrationsPage() {
  const folderName = 'poetry-illustrations/';
  const images = await fetchImagesFromR2(folderName);

  return <GalleryClient images={images} title="Poetry Illustrations"/>;
}