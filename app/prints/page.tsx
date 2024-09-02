import { fetchImagesFromR2 } from '../actions/fetchImages';
import GalleryClient from '../components/GalleryClient';

export default async function Prints() {
  const folderName = 'prints/';
  const imageKeys = await fetchImagesFromR2(folderName);

  return <GalleryClient initialImageKeys={imageKeys} title="Prints"/>;
}