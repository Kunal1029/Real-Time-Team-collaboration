import React, { useState } from "react";

interface User {
  _id: string;
  name: string;
  email: string;
}

interface Team {
  name: string;
  members?: User[];
}

interface TableData2Props {
  teamName: Team;
  allUser: User[];
}

const TableData2: React.FC<TableData2Props> = ({ teamName, allUser }) => {
  const [isInTeam, setIsInTeam] = useState([]);

  function isMemberInTeam() {
    const isIn = allUser.map((x) =>
      teamName?.members?.some((teamMember) => teamMember._id !== x._id)
    );
    setIsInTeam(isIn)
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          All Members
        </h5>
      </div>
      <div className="flow-root">
        <ul
          role="list"
          className="divide-y divide-gray-200 dark:divide-gray-700"
        >
          {allUser?.map((member, index) => {
            // Check if member is already in the team
            const isMemberInTeam = teamName?.members?.some(
              (teamMember) => teamMember._id === member._id
            );

            return (
              <li key={member?._id} className="py-3 sm:py-4">
                <div className="flex items-center">
                  <div className="">{index + 1}</div>
                  <div className="flex-1 min-w-0 ms-4">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      {member?.name}
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      {member?.email}
                    </p>
                  </div>

                  {!isMemberInTeam && (
                    <button className="inline-flex items-center px-3 py-1 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800">
                      Add to {teamName?.name}
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default TableData2;
