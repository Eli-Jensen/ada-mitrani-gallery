import { fetchImagesFromR2 } from '../actions/fetchImages';
import GalleryClient from '../components/GalleryClient';

export default async function InkDrawingsPage() {
  const folderName = 'ink-drawings/';
  const images = await fetchImagesFromR2(folderName);

  return <GalleryClient images={images} title="Ink Drawings"/>;
}