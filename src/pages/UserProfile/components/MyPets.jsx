import React from "react";
import { useAuthContext } from "../../../context/Auth.Context";
import PetCard from "../../../components/PetCard";
import { Link } from "react-router-dom";

function MyPets() {
  const user = useAuthContext();
  const userPets = user.adoptedPets;

  if (userPets) {
    return (
      <div className="items-center justify-center flex w-max mr-20 flex-1">
        <div className="p-4 w-1/2 rounded-lg">
          <h2 className="text-2xl mb-4 text-AMblue">My pets</h2>
          {userPets.map((petData) => (
            <div key={petData._id} className="my-2">
              <PetCard petData={petData} />;
              <button className="mt-4 bg-red-500 text-white py-2 px-4 rounded">
                Delete pet from AdoptifyMe{" "}
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="items-center justify-center flex w-max mr-20 flex-1">
        <div className="p-4 w-1/2 rounded-lg">
          <h2 className="text-2xl mb-4 text-AMblue">My pets</h2>
          <p>You currently have no adopted pets.</p>
          <Link to="/pets">
            <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
              Adopt your first furry friend!
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default MyPets;
