import { fetchImagesFromR2 } from '../actions/fetchImages';
import GalleryClient from '../components/GalleryClient';

export default async function PoetryIllustrationsPage() {
  const folderName = 'poetry-illustrations/';
  const imageKeys = await fetchImagesFromR2(folderName);

  return <GalleryClient initialImageKeys={imageKeys} title="Poetry Illustrations"/>;
}