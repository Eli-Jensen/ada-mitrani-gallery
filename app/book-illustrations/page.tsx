import Image from 'next/image';
import { fetchImagesFromR2 } from '../actions/fetchImages';

export default async function BookIllustrationsPage() {
  const folderName = 'children-book-illustrations/';
  const imageKeys = await fetchImagesFromR2(folderName);

  console.log(imageKeys);

  return (
    <div className="image-gallery">
      {imageKeys.map((key) => (
        <div key={key} className="image-container">
          <Image
            src={`${process.env.NEXT_PUBLIC_R2_BUCKET_URL}/${key}`}
            alt={key}
            width={300}
            height={300}
            className="image"
          />
        </div>
      ))}
    </div>
  );
}
