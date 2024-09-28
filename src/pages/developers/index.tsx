import Link from 'next/link';
import { useEffect, useState } from 'react';

const DevelopersList = () => {
  const [developers, setDevelopers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const response = await fetch('/api/developers');
        const data = await response.json();
        setDevelopers(data.documents); // Assuming the response structure has a `documents` array
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch developers', error);
        setLoading(false);
      }
    };

    fetchDevelopers();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold my-4">Registered Developers</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {developers.map(developer => (
          <div key={developer.$id} className="p-4 bg-white rounded-lg shadow-md">
            {developer?.profilePicture && (
              <img
                src={developer.profilePicture}
                alt={developer.username}
                className="w-16 h-16 rounded-full"
              />
            )}
            <h2 className="text-xl font-semibold mt-2">{developer.name}</h2>
            <p>{developer.email}</p>
            <Link href={`/profile/${developer.$collectionId}`} key={developer.$collectionId}>Profile</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DevelopersList;
