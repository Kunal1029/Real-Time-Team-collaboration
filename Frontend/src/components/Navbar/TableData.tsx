import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import { getCurrentTeam, addMember } from "../Redux/Features/teamSlice";
import { getAlluser } from "../Redux/Features/authSlice";
import { useEffect, useState } from "react";
import TableData2 from "./TableData2";

const TableData: React.FC = () => {
  const [activeTab, setActiveTab] = useState("stats");
  const [selectedTeam, setSelectedTeam] = useState<any>([]);

  const currRole = useAppSelector((state) => state.temp.currRole);
  const currteam = useAppSelector((state) => state.temp.currteam);
  const teamID = useAppSelector((state) => state.temp.teamID);
  const { allUser } = useAppSelector((state) => state.auth);
  const { user } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  const [myTeam, setMyTeam] = useState({});

  useEffect(() => {
    if (!teamID) return; // guard clause

    const fetchTeam = async () => {
      try {
        const res = await dispatch(getCurrentTeam(teamID));
        if (getCurrentTeam.fulfilled.match(res)) {
          setMyTeam(res.payload);
          setSelectedTeam(res.payload.members);
        } else {
          console.error("Failed to fetch team:", res.payload);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      }
    };
    fetchTeam();
    dispatch(getAlluser());
  }, [dispatch, teamID]);

  const addMemberToTeam = (teamId: string, email: string) => {
    dispatch(addMember({ teamId, email }));
  };

  return (
    <div>
      <div className="w-full max-w-5xl mb-10 mx-auto bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        {/* Mobile dropdown */}
        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">
            Select tab
          </label>
          <select
            id="tabs"
            className="bg-gray-50 border-0 border-b border-gray-200 text-gray-900 text-sm rounded-t-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
          >
            <option value="stats">Statistics</option>
            <option value="about">Team Details</option>
            <option value="faq">FAQ</option>
          </select>
        </div>

        {/* Desktop tabs */}
        <ul className="hidden text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg sm:flex dark:divide-gray-600 dark:text-gray-400 rtl:divide-x-reverse">
          <li className="w-full">
            <button
              onClick={() => setActiveTab("about")}
              className={`inline-block w-full p-4 ${
                activeTab === "about"
                  ? "text-blue-600 bg-blue-50 dark:bg-gray-700 dark:text-blue-500"
                  : "bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600"
              }`}
            >
              Team Details
            </button>
          </li>

          <li className="w-full">
            <button
              onClick={() => setActiveTab("stats")}
              className={`inline-block w-full p-4 rounded-ss-lg ${
                activeTab === "stats"
                  ? "text-blue-600 bg-blue-50 dark:bg-gray-700 dark:text-blue-500"
                  : "bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600"
              }`}
            >
              Statistics
            </button>
          </li>
        </ul>

        {/* Tab content */}
        <div className="border-t border-gray-200 dark:border-gray-600">
          {/* Statistics Tab */}
          {activeTab === "stats" && (
            <div className="p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800">
              <dl className="grid max-w-screen-xl grid-cols-2 gap-8 p-4 mx-auto text-gray-900 sm:grid-cols-3 xl:grid-cols-6 dark:text-white sm:p-8">
                <div className="flex flex-col items-center justify-center">
                  <dt className="mb-2 text-3xl font-extrabold">73M+</dt>
                  <dd className="text-gray-500 dark:text-gray-400">
                    Developers
                  </dd>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <dt className="mb-2 text-3xl font-extrabold">100M+</dt>
                  <dd className="text-gray-500 dark:text-gray-400">
                    Public repositories
                  </dd>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <dt className="mb-2 text-3xl font-extrabold">1000s</dt>
                  <dd className="text-gray-500 dark:text-gray-400">
                    Open source projects
                  </dd>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <dt className="mb-2 text-3xl font-extrabold">1B+</dt>
                  <dd className="text-gray-500 dark:text-gray-400">
                    Contributors
                  </dd>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <dt className="mb-2 text-3xl font-extrabold">90+</dt>
                  <dd className="text-gray-500 dark:text-gray-400">
                    Top Forbes companies
                  </dd>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <dt className="mb-2 text-3xl font-extrabold">4M+</dt>
                  <dd className="text-gray-500 dark:text-gray-400">
                    Organizations
                  </dd>
                </div>
              </dl>
            </div>
          )}

          {/* Team Details Tab */}
          {activeTab === "about" && (
            <div className="p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800">
              <h2 className="mb-5 text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                Current Team: {myTeam?.name}
              </h2>

              {/* Team Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-gray-50 rounded-lg dark:bg-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Team Owner
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    {myTeam?.owner?.name}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg dark:bg-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Total Members
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    {myTeam?.members?.length}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg dark:bg-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Team Since
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    {myTeam?.createdAt}
                  </p>
                </div>
              </div>

              {/* Team Members Table */}
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Member Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Role
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Join Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-right">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {myTeam?.members &&
                      selectedTeam.map((m, i) => (
                        <tr
                          key={m?.joinedAt}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {m?.user?.name}
                          </th>
                          <td className="px-6 py-4">{m?.role}</td>
                          <td className="px-6 py-4">{m?.joinedAt}</td>
                          <td className="px-6 py-4 text-right">
                            {m.role !== "admin" && (
                              <button className="font-medium text-red-600 dark:text-red-500 hover:underline">
                                Remove
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
      <TableData2 teamName={myTeam} allUser={allUser} />
    </div>
  );
};

export default TableData;
