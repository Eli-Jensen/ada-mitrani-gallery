import { fetchImagesFromR2 } from '../actions/fetchImages';
import GalleryClient from '../components/GalleryClient';

export default async function InkDrawingsPage() {
  const folderName = 'ink-drawings/';
  const imageKeys = await fetchImagesFromR2(folderName);

  return <GalleryClient initialImageKeys={imageKeys} title="Ink Drawings"/>;
}