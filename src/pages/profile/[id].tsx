import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';

const Profile = () => {

  const router = useRouter()
  const { id } = router.query

  const [profile, setProfile] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/profile', {
          method: 'POST',
          body: JSON.stringify(id)
        });
        const data = await response.json();
        setProfile(data.documents); // Assuming the response structure has a `documents` array
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch developers', error);
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Profile {id}</h1>
    </div>
  )
};

export default Profile;
