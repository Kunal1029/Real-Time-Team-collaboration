import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import { getCurrentTeam, addMember } from "../Redux/Features/teamSlice";
import { getAlluser } from "../Redux/Features/authSlice";
import { useEffect, useState } from "react";
import TableData from "./TableData";

const TeamsPage = () => {
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

  // console.log(myTeam)

  const addMemberToTeam = (teamId: string, email: string) => {
    dispatch(addMember({ teamId, email }));
  };

  return (
    <div>
      <TableData />
      {currRole === "admin" && (
        <h1>
          For admin Content click to Edit, delete any team as your admin, Add
          any user, delete user.
        </h1>
      )}
      {currRole === "manager" && (
        <h2>For admin & manager content , edit team member or assign task</h2>
      )}
      {currRole === "member" && <h3>Normal/Common content</h3>}
      
      <h1>
        Hey This is Team Page , team = {currteam} & role = {currRole}
      </h1>

      <h2 className="text-xl">{myTeam?.name}</h2>
      <br />
      <br />
      {/* add, user, show all users here */}
      <div className="allUser">
        All Members
        <ul className="mt-5">
          {allUser?.map((u) => (
            <li key={u._id}>
              {u.email}, {u._id}{" "}
              <button onClick={() => addMemberToTeam(myTeam?._id, u?.email)}>
                + Add this user to your {myTeam?.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TeamsPage;
