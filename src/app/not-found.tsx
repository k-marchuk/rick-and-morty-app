import Image from 'next/image';
import Rick from '/public/images/rick.png';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container flex flex-col mx-auto py-20 items-center">
      <Image src={Rick} alt="Rick and Morty" width={350} height={300} />
      <p className="text-lg text-center pt-12 pe-2 md:text-3xl text-gray-500">
        Morty, this is not the page you were looking for!
      </p>
      <p className="text-lg text-center pt-4  md:text-3xl text-gray-500">
        You need to pick a better portal.
      </p>
      <Link
        href={'/'}
        className="pt-2 md:text-2xl text-pink-500 duration-300 hover:underline"
      >
        Go home
      </Link>
    </div>
  );
}
