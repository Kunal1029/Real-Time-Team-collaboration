/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import {
  getCurrentTeam,
  fetchNonAdminMembers,
  fetchNonMembers,
  removeMember,
  promoteMember,
} from "../Redux/Features/teamSlice";
import { useEffect, useState } from "react";
import TableData2 from "./TableData2";
import toastService from "../helper/toastService";

type myT = {
  name: string;
  owner: { name: string };
  members: [];
  createdAt: string;
};

const TableData: React.FC = () => {
  const [activeTab, setActiveTab] = useState("about");
  const [myTeam, setMyTeam] = useState<myT | null>(null);

  const teamID = useAppSelector((state) => state.temp.teamID);
  const currRole = useAppSelector((state) => state.temp.currRole);
  const { nonAdminMembers } = useAppSelector((state) => state.team);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!teamID) return;

    const fetchTeam = async () => {
      try {
        const res = await dispatch(getCurrentTeam(teamID));
        if (getCurrentTeam.fulfilled.match(res)) {
          setMyTeam(res.payload);
        } else {
          console.error("Failed to fetch team:", res.payload);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      }
    };

    fetchTeam();
    dispatch(fetchNonAdminMembers(teamID));
  }, [dispatch, teamID]);

  const PromoteToManager = async (teamId: string, userId: string) => {
    try {
      await dispatch(promoteMember({ teamId, userId })).unwrap();
      toastService.success(`Member Promoted to Manager`);
      dispatch(fetchNonAdminMembers(teamId));
      dispatch(fetchNonMembers(teamId));
    } catch (error: any) {
      toastService.error(error?.message || "Failed to remove member");
    }
  };

  const RemoveMemberFromTeam = async (teamId: string, userId: string) => {
    try {
      await dispatch(removeMember({ teamId, userId })).unwrap();
      toastService.success("Member removed successfully");

      // Optionally refresh the lists
      dispatch(fetchNonAdminMembers(teamId));
      dispatch(fetchNonMembers(teamId));
    } catch (error: any) {
      toastService.error(error?.message || "Failed to remove member");
    }
  };

  return (
    <div>
      <div className="w-full max-w-5xl mb-10 mx-auto bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        {/* Mobile Dropdown */}
        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">
            Select tab
          </label>
          <select
            id="tabs"
            className="bg-gray-50 border-0 border-b border-gray-200 text-gray-900 text-sm rounded-t-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
          >
            <option value="stats">Statistics</option>
            <option value="about">Team Details</option>
            <option value="faq">FAQ</option>
          </select>
        </div>

        {/* Desktop Tabs */}
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
              className={`inline-block w-full p-4 ${
                activeTab === "stats"
                  ? "text-blue-600 bg-blue-50 dark:bg-gray-700 dark:text-blue-500"
                  : "bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600"
              }`}
            >
              Statistics
            </button>
          </li>
        </ul>

        {/* Tab Content */}
        <div className="border-t border-gray-200 dark:border-gray-600">
          {activeTab === "stats" && (
            <div className="p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800">
              <dl className="grid max-w-screen-xl grid-cols-2 gap-8 p-4 mx-auto text-gray-900 sm:grid-cols-3 xl:grid-cols-6 dark:text-white sm:p-8">
                {[
                  ["73M+", "Developers"],
                  ["100M+", "Public repositories"],
                  ["1000s", "Open source projects"],
                  ["1B+", "Contributors"],
                  ["90+", "Top Forbes companies"],
                  ["4M+", "Organizations"],
                ].map(([stat, label]) => (
                  <div
                    key={label}
                    className="flex flex-col items-center justify-center"
                  >
                    <dt className="mb-2 text-3xl font-extrabold">{stat}</dt>
                    <dd className="text-gray-500 dark:text-gray-400">
                      {label}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {activeTab === "about" && (
            <div className="p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800">
              <h2 className="mb-5 text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                Current Team: {myTeam?.name || "N/A"}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-gray-50 rounded-lg dark:bg-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Team Owner
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    {myTeam?.owner?.name || "Not available"}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg dark:bg-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Total Members
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    {myTeam?.members?.length || 0}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg dark:bg-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Team Since
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    {myTeam?.createdAt
                      ? new Date(myTeam?.createdAt).toLocaleDateString()
                      : "Not available"}
                  </p>
                </div>
              </div>

              {/* Team Member Table */}
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th className="px-6 py-3">Member Name</th>
                      <th className="px-6 py-3">Role</th>
                      <th className="px-6 py-3">Join Date</th>
                      {currRole === "admin" && <th className="px-6 py-3 text-right">Action</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {nonAdminMembers?.length ? (
                      nonAdminMembers.map((m, i) => (
                        <tr
                          key={m?.joinedAt + i}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                          <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                            {m?.user?.name}
                            <h5 className="">{m?.user?.email}</h5>
                          </td>
                          <td
                            className={`px-6 py-4 ${
                              m?.role === "manager" ? "text-rose-600" : ""
                            } `}
                          >
                            {m?.role === "manager" ? "Manager" : m?.role}
                          </td>
                          <td className="px-6 py-4">
                            {m?.joinedAt
                              ? new Date(m.joinedAt).toLocaleDateString()
                              : "N/A"}
                          </td>
                          <td className="px-6 py-4 text-right ">
                            {m?.role === "member" && currRole === "admin" && (
                              <button
                                onClick={() =>
                                  teamID && typeof teamID === "string" && PromoteToManager(teamID, m?.user?._id)
                                }
                                className="inline-flex  items-center px-3 py-1 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800"
                              >
                                Promote to Manager
                              </button>
                            )}

                            {currRole === "admin" && (
                              <button
                                onClick={() =>
                                  teamID && typeof teamID === "string" && RemoveMemberFromTeam(teamID, m?.user?._id)
                                }
                                className="inline-flex ms-5 items-center px-3 py-1 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-800"
                              >
                                Remove
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={4}
                          className="text-center py-6 text-gray-500"
                        >
                          No members (excluding admins) found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Invite/Non-members Section */}
      <TableData2 />
    </div>
  );
};

export default TableData;
