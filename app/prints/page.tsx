import { fetchImagesFromR2 } from '../actions/fetchImages';
import GalleryClient from '../components/GalleryClient';

export default async function Prints() {
  const folderName = 'prints/';
  const images = await fetchImagesFromR2(folderName);

  return <GalleryClient images={images} title="Prints"/>;
}