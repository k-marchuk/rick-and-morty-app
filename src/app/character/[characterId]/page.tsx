import { Character } from '@/app/types/Character';
import { Episode } from '@/app/types/Episode';
import Image from 'next/image';
import { FaHeartbeat } from 'react-icons/fa';
import { FaTransgender } from 'react-icons/fa';
import { GiDna2 } from 'react-icons/gi';
import { RiHomeHeartLine } from 'react-icons/ri';
import { FaMapMarkedAlt } from 'react-icons/fa';
import { BASE_URL } from '@/app/services/fetchClient';
import { Path } from '@/app/types/UrlPath';

export default async function Page({
  params,
}: {
  params: { characterId: string };
}) {
  const characterResponse = await fetch(
    `${BASE_URL}/${Path.Character}/${params.characterId}`
  );

  const character: Character = await characterResponse.json();

  const episodesId = character.episode
    .map((url) => Number(url.split('/')[5]))
    .join();

  const episodesResponse = await fetch(
    `${BASE_URL}/${Path.Episode}/[${episodesId}]`
  );

  const episodes: Episode[] = await episodesResponse.json();

  return (
    <div className="container mx-auto flex flex-col px-10 py-10">
      <div className="hero bg-base-100 mt-10 p-8 shadow-xl">
        <div className="hero-content flex-col lg:flex-row items-center">
          <div className="w-full flex justify-center mb-6 lg:mb-0">
            <Image
              src={character.image}
              alt={character.name}
              width={400}
              height={400}
              className="shadow-lg mr-6"
            />
          </div>
          <div className="w-full text-center lg:text-left">
            <h2 className="text-4xl text-center mb-10 font-bold">
              {character.name}
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between text-lg">
                <div className="flex items-center font-semibold text-pink-500">
                  Status
                  <FaHeartbeat className="ml-1" />
                </div>
                <p>{character.status}</p>
              </div>
              <div className="flex justify-between text-lg">
                <div className="flex items-center font-semibold text-pink-500">
                  Gender <FaTransgender className="ml-1" />
                </div>
                <p>{character.gender}</p>
              </div>
              <div className="flex justify-between text-lg">
                <div className="flex items-center font-semibold text-pink-500">
                  Species <GiDna2 className="ml-1" />
                </div>
                <p>{character.species}</p>
              </div>
              <div className="flex justify-between text-lg">
                <div className="flex items-center font-semibold text-pink-500">
                  Origin <RiHomeHeartLine className="ml-1" />
                </div>
                <p className="text-right">{character.origin.name}</p>
              </div>
              <div className="flex justify-between text-lg">
                <div className="flex items-center font-semibold text-pink-500">
                  Location <FaMapMarkedAlt className="ml-1" />
                </div>
                <p className="text-right">{character.location.name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-initial w-320">
        <div className="divider divider-success mt-10 mb-8 text-2xl">
          Featured in:
        </div>
        <ul className="timeline timeline-snap-icon  timeline-vertical">
          {episodes.map((episode, index) => {
            return (
              <li key={episode.id}>
                <div className="timeline-start mr-4">
                  {episode.air_date}
                  <br></br>
                </div>
                <div className="timeline-middle">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="timeline-end ml-4 timeline-box">
                  {episode.episode}
                  {' - '}
                  {`"${episode.name}"`}
                </div>
                {index !== episodes.length - 1 && <hr />}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
