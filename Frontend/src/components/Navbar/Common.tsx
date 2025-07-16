import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { fetchTeams } from "../Redux/Features/teamSlice";
import { getUserProfile, getAlluser } from "../Redux/Features/authSlice";

const Common = () => {
  const dispatch = useAppDispatch();
  const { teams } = useAppSelector((state) => state.team);
  const { user, allUser } = useAppSelector((state) => state.auth);

  const currRole = useAppSelector((state) => state.temp.currRole);

  useEffect(() => {
    dispatch(getUserProfile());
    dispatch(getAlluser());
    dispatch(fetchTeams());
  }, [dispatch]);
  // console.log(allUser)
  return (
    <div className="grid">
      <div className="user-details">
        <h2>Your Name: {user?.name || "Loading..."}</h2>
        <h2>Your Email: {user?.email || "Loading..."}</h2>

        {user?.teams && user.teams.length > 0 ? (
          <div>
            <h3>Your Teams: For Admin, Manager, Member</h3>
            {user.teams.map((t, i) => {
              const currentUserMember = Array.isArray(t.members)
                ? t.members.find((member) => member.user === user._id)
                : null;

              return (
                <div key={i}>
                  <h4>
                    {i + 1}. {t.name} &nbsp; (
                    {currentUserMember?.role || "member"})
                  </h4>
                  <h4>{t.description}</h4>
                </div>
              );
            })}
          </div>
        ) : (
          "No teams found"
        )}
      </div>

      <div className="mt-14 mb-15">
        <h1>All Users</h1>
        {currRole === "admin"
          ? allUser?.map(
              (
                a //only show names here
              ) => <li key={a._id}>Email : {a.email}</li>
            )
          : "cannot show to manager/member"}
      </div>
    </div>
  );
};

export default Common;
