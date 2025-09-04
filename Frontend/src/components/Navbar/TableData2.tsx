import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import {
  getCurrentTeam,
  fetchNonMembers,
  fetchNonAdminMembers,
  addMember,
} from "../Redux/Features/teamSlice";
import toastService from "../helper/toastService";

const TableData2 = () => {
  const dispatch = useAppDispatch();

  const currteam = useAppSelector((state) => state.temp.currteam);
  const teamID = useAppSelector((state) => state.temp.teamID as string);
  const user = useAppSelector(
    (state) => state.auth.user as { name: string; email: string } | null
  );
  const { nonMembers, nonAdminMembers } = useAppSelector((state) => state.team);

  useEffect(() => {
    if (!teamID) return;

    dispatch(getCurrentTeam(teamID));
    dispatch(fetchNonAdminMembers(teamID));
    dispatch(fetchNonMembers(teamID));
  }, [dispatch, teamID, currteam]);

  const addMemberToTeam = async (teamId: string, email: string) => {
    try {
      await dispatch(addMember({ email, teamId })).unwrap();

      await dispatch(fetchNonAdminMembers(teamId));
      await dispatch(fetchNonMembers(teamId));

      toastService.success(`Member added to team ${name} successfully`);
    } catch (error) {
      toastService.error(`Failed to add member: ${error}`);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl mx-auto font-bold leading-none text-gray-900 dark:text-white">
          All Members in Platform
        </h5>
      </div>

      <div className="flow-root">
        <ul
          role="list"
          className="divide-y divide-gray-200 dark:divide-gray-700"
        >
          {/* Current Logged-in User */}

          {user && (
            <li className="py-3 sm:py-4">
              <div className="flex items-center">
                <div className="flex-1 min-w-0 ms-4">
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    {user?.name}
                  </p>
                  <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                    {user?.email}
                  </p>
                </div>
                <button className="inline-flex items-center px-3 py-1 text-sm font-medium text-white bg-black-600 rounded-lg hover:bg-black-700 focus:ring-4 focus:outline-none focus:ring-black-300 dark:bg-black-500 dark:hover:bg-black-600 dark:focus:ring-black-800">
                  Admin
                </button>
              </div>
            </li>
          )}

          {/* Non-Admin Members of Current Team */}
          {nonAdminMembers?.length > 0 && (
            <>
              <li className="py-3 sm:py-4 font-semibold text-green-600 dark:text-green-400 px-4">
                Team Members (excluding Admin)
              </li>
              {nonAdminMembers.map((m, i) => (
                <li className="py-3 sm:py-4" key={i}>
                  <div className="flex items-center">
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {m?.user?.name}
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {m?.user?.email}
                      </p>
                    </div>
                    <button className="inline-flex items-center px-3 py-1 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800">
                      Team Members
                    </button>
                  </div>
                </li>
              ))}
            </>
          )}

          {/* Users Not in the Team */}
          {nonMembers?.length > 0 && (
            <>
              <li className="py-3 sm:py-4 font-semibold text-blue-600 dark:text-blue-400 px-4">
                Users Not in Team
              </li>
              {nonMembers.map((u, i) => (
                <li className="py-3 sm:py-4" key={i}>
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {u?.name}
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {u?.email}
                      </p>
                    </div>
                    <button
                      onClick={() => addMemberToTeam(teamID, u?.email)}
                      className="inline-flex items-center px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
                    >
                      Add to {currteam}
                    </button>
                  </div>
                </li>
              ))}
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default TableData2;
