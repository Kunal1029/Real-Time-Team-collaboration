import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { fetchTeams } from "../Redux/Features/teamSlice";
import { getUserProfile, getAlluser } from "../Redux/Features/authSlice";

interface Testimonial {
  name: string;
  title: string;
  message: string;
  role: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Bonnie Green",
    title: "USER DETAILS WHO IS LOGGED IN",
    message: `If you care for your time, I hands down would go with this."`,
    role: "Developer at Open AI",
    image:
      "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png",
  },
  {
    name: "Roberta Casas",
    title: "Role Details which is current selected role",
    message: `Designing with Figma components that can be easily translated to the utility classes of Tailwind CSS is a huge timesaver!"`,
    role: "Lead designer at Dropbox",
    image:
      "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/roberta-casas.png",
  },
 
];

const Common = () => {
  const dispatch = useAppDispatch();
  const  user  = useAppSelector((state) => state.auth.user);
  const currRole = useAppSelector((state)=> state.temp.currRole)

  useEffect(() => {
    dispatch(getUserProfile());
    dispatch(getAlluser());
    dispatch(fetchTeams());
  }, [dispatch]);

  // console.log(allUser)

  return (
    <div className="mb-8 mt-5 border m-10 border-gray-200 rounded-lg shadow-xs dark:border-gray-700 md:mb-12 md:grid-cols-2 bg-white dark:bg-gray-800">
      <h3 className="p-2 mt-5 mx-auto text-2xl text-orange-500">Welcome {user?.name}, Your Current Role is "{currRole}"</h3>
      <h5 className=" p-2 mt-5 mx-auto text-xl">You can visit all teams in which you are {currRole}</h5>
      <ul className="mx-auto ms-5">
        <li>- You can remove, add, promote to manager any user in teams when you are Admin of that team.</li>
        <li>- If you switch to any role like Admin, Manager, Member then you can see all teams in which your current Role is equals to Team Role.</li>
        <li>- This App is in WIP and create new features in future.</li>
      </ul>

      <h4 className="ms-2 mt-20"><i>@2025 Real-Time TC APP</i></h4>
     {testimonials.map((t, index) => (
        <figure
          key={index}
          className={`flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 
            ${index === 0 ? "md:rounded-ss-lg md:border-e" : ""}
            ${index === 1 ? "md:rounded-se-lg" : ""}
            ${index === 2 ? "md:rounded-es-lg md:border-b-0 md:border-e" : ""}
            ${index === 3 ? "md:rounded-se-lg" : ""}
            dark:bg-gray-800 dark:border-gray-700`}
        >
          <blockquote className="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {/* {t.title} */}
            </h3>
            {/* <p className="my-4">{t.message}</p> */}
          </blockquote>
          <figcaption className="flex items-center justify-center">
            
            <div className="space-y-0.5 font-medium dark:text-white text-left rtl:text-right ms-3">
              {/* <div>{t.name}</div> */}
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {/* {t.role} */}
              </div>
            </div>
          </figcaption>
        </figure>
      ))}
    </div>
  );
};

export default Common;
