import React, { useEffect, useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import Request from "../../../../utils/Axios/config";
import { useDetails } from "../../../../utils/Context/MetaDetails";
import ComradeCard from "../cards/ComradeCard";
import { useUserAuth } from "../../../../utils/Context/UserAthenticationContext";
import toast, { Toaster } from 'react-hot-toast';

function Comrades() {
  const { comradesDetails, setcomradesDetails } = useDetails();
  const { user } = useUserAuth();

  const ToggleComrade = async (useridentity) => {
    try {
      const response = await Request.post("/comrade/addandremovecomrade", {
        uid: user.uid,
        comradeid: useridentity,
      });

      if (response.status === 200) {
        setcomradesDetails(
          comradesDetails.filter((item) => item.uid !== useridentity)
        );

        toast.success(`You are now not comrades`, {
          position: "top-center",  
        });
      } else {
        throw new Error("Failed to toggle comrade");
      }
    } catch (error) {
      console.error("Error toggling comrade:", error);
      toast.error("Error occurred during toggling comrade", {
        position: "top-center",
      });
    }
  };

  return (
    <div>
      <Tabs.Content className="tab-content mx-5 lg:mx-12" value="Posts">
        <div className="bg-white mt-5 mb-10 lg:px-4">
          <h2 className="text-2xl ms-3 font-bold text-gray-800 mb-4">
            {comradesDetails && comradesDetails.length} Comrades
          </h2>
          <div className="w-full">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
              {comradesDetails &&
                comradesDetails.map((item, index) => (
                  <ComradeCard
                    key={index}
                    ToggleComrade={ToggleComrade}
                    item={item}
                    index={index}
                  />
                ))}
            </div>
          </div>
        </div>
      </Tabs.Content>
      <Toaster />
    </div>
  );
}

export default Comrades;
