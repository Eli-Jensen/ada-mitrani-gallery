import { fetchImagesFromR2 } from '../actions/fetchImages';
import GalleryClient from '../components/GalleryClient';

export default async function BookCoversPage() {
  const folderName = 'book-covers/';
  const imageKeys = await fetchImagesFromR2(folderName);

  return <GalleryClient initialImageKeys={imageKeys} title="Book Covers"/>;
}