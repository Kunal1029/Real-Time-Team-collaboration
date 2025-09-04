import { useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  position: string;
  status: 'Online' | 'Offline';
  image: string;
}

const Columns = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: 'Neil Sims',
      email: 'neil.sims@flowbite.com',
      position: 'React Developer',
      status: 'Online',
      image: '/docs/images/people/profile-picture-1.jpg'
    },
    {
      id: 2,
      name: 'Bonnie Green',
      email: 'bonnie@flowbite.com',
      position: 'Designer',
      status: 'Online',
      image: '/docs/images/people/profile-picture-3.jpg'
    },
    {
      id: 3,
      name: 'Jese Leos',
      email: 'jese@flowbite.com',
      position: 'Vue JS Developer',
      status: 'Online',
      image: '/docs/images/people/profile-picture-2.jpg'
    },
    {
      id: 4,
      name: 'Thomas Lean',
      email: 'thomes@flowbite.com',
      position: 'UI/UX Engineer',
      status: 'Online',
      image: '/docs/images/people/profile-picture-5.jpg'
    },
    {
      id: 5,
      name: 'Leslie Livingston',
      email: 'leslie@flowbite.com',
      position: 'SEO Specialist',
      status: 'Offline',
      image: '/docs/images/people/profile-picture-4.jpg'
    }
  ]);

  const [selectAll, setSelectAll] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setSelectAll(isChecked);
    if (isChecked) {
      setSelectedUsers(users.map(user => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (userId: number, isChecked: boolean) => {
    if (isChecked) {
      setSelectedUsers([...selectedUsers, userId]);
    } else {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    }
  };

  return (
    <div className=" relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
        <div>
         
          <div
            id="dropdownAction"
            className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600"
          >
            <ul
              className="py-1 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownActionButton"
            >
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Reward
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Promote
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Activate account
                </a>
              </li>
            </ul>
            <div className="py-1">
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Delete User
              </a>
            </div>
          </div>
        </div>
        <label htmlFor="table-search" className="sr-only">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="table-search-users"
            className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for users"
          />
        </div>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
                <label htmlFor="checkbox-all-search" className="sr-only">
                  checkbox
                </label>
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Position
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="w-4 p-4">
                <div className="flex items-center">
                  <input
                    id={`checkbox-table-search-${user.id}`}
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    checked={selectedUsers.includes(user.id)}
                    onChange={(e) => handleSelectUser(user.id, e.target.checked)}
                  />
                  <label
                    htmlFor={`checkbox-table-search-${user.id}`}
                    className="sr-only"
                  >
                    checkbox
                  </label>
                </div>
              </td>
              <th
                scope="row"
                className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
              >
                <img
                  className="w-10 h-10 rounded-full"
                  src={user.image}
                  alt={`${user.name} image`}
                />
                <div className="ps-3">
                  <div className="text-base font-semibold">{user.name}</div>
                  <div className="font-normal text-gray-500">{user.email}</div>
                </div>
              </th>
              <td className="px-6 py-4">{user.position}</td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div
                    className={`h-2.5 w-2.5 rounded-full ${
                      user.status === 'Online' ? 'bg-green-500' : 'bg-red-500'
                    } me-2`}
                  ></div>{' '}
                  {user.status}
                </div>
              </td>
              <td className="px-6 py-4">
                <a
                  href="#"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Edit user
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Columns;