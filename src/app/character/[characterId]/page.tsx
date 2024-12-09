import { Character } from '@/app/types/Character';
import { Episode } from '@/app/types/Episode';
import Image from 'next/image';

export default async function Page({
  params,
}: {
  params: { characterId: string };
}) {
  const characterResponse = await fetch(
    `https://rickandmortyapi.com/api/character/${params.characterId}`
  );

  const character: Character = await characterResponse.json();

  const episodesId = character.episode
    .map((url) => Number(url.split('/')[5]))
    .join();

  const episodesResponse = await fetch(
    `https://rickandmortyapi.com/api/episode/[${episodesId}]`
  );

  const episodes: Episode[] = await episodesResponse.json();
  // console.log({ episodes });
  // console.log(character);

  return (
    <div className="container mx-auto px-10 py-10 flex-col">
      <div className="hero bg-base-100 mt-30 shadow-xl">
        <div className="hero-content flex-col lg:flex-row">
          <Image src={character.image} alt="Shoes" width={200} height={200} />

          <div className="card-body flex items-start">
            <h2 className="text-4xl self-center font-bold">{character.name}</h2>

            <div className="flex w-full justify-between ">
              <div className=" text-pink-500">Status:</div>
              <p>{character.status}</p>
            </div>
            <div className="flex w-full justify-between ">
              <div className=" text-pink-500">Gender:</div>
              <p>{character.gender}</p>
            </div>
            <div className="flex w-full justify-between ">
              <div className=" text-pink-500">Species:</div>
              <p>{character.species}</p>
            </div>
            <div className="flex w-full justify-between ">
              <div className=" text-pink-500">Origin:</div>
              <p>{character.origin.name}</p>
            </div>
            <div className="flex w-full justify-between ">
              <div className=" text-pink-500">Location:</div>
              <p>{character.location.name}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-initial w-320">
        <div className="divider divider-success mt-10 text-2xl">
          Featured in:
        </div>
        <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
          {episodes.map((episode, index) => {
            return (
              <li key={episode.id}>
                <div className="timeline-start">
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
                <div className="timeline-end timeline-box">
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
