const features = [
  {
    name: 'Sign Up for CollabFlow TNC',
    description:
      "It's a quick & easy process. Provide your email, create a password, & you're ready to go.",
    icon: <i className="fa-solid fa-arrow-right-to-bracket"></i>,
  },
  {
    name: 'Create Your Workspace',
    description:
      "create a workspace tailored to your team's unique needs. Define projects, set access levels.",
     icon: <i className="fa-solid fa-folder-plus"></i>,
  },
  {
    name: 'Manage Task & Assign',
    description:
      "Assign tasks to specific team members, set due dates, and attach relevant documents.",
     icon: <i className="fa-solid fa-people-roof"></i>,
  },
  {
    name: 'Start Collaborating',
    description:
      'Dive into seamless collaboration with your team. Assign tasks, share files, achieve your goals.',
    icon: <i className="fa-solid fa-compress"></i>,
  },
]

export default function SecPage() {
  return (
    <div className="">
      <div className="mx-auto max-w-7xl py-10 pb-30">
        <div className="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
          <svg
            viewBox="0 0 1024 1024"
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 -z-10 size-256 -translate-y-1/2 mask-[radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
          >
            <circle r={512} cx={512} cy={512} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
            <defs>
              <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                <stop stopColor="#7775D6" />
                <stop offset={1} stopColor="#E935C1" />
              </radialGradient>
            </defs>
          </svg>

          <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
            <h2 className="text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-6 text-lg/8 text-pretty text-gray-300">
              Team Collab Flow is not just a tool; it's a catalyst for transforming the way your team collaborates.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
              <a
                href="#"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-xs hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {' '}
                Get started{' '}
              </a>
              <a href="#" className="text-sm/6 font-semibold text-white hover:text-gray-100">
                Learn more
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          <div className="relative mt-16 h-80 lg:mt-8">
            <img
              alt="App screenshot"
            //   src="https://tailwindcss.com/plus-assets/img/component-images/dark-project-app-screenshot.png"
              src="./sec.png"
              width={1824}
              height={1080}
              className="absolute top-0 left-0 w-228 max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
            />
          </div>
        </div>

         {/* <div className="mx-auto max-w-7xl px-6 lg:px-8"> */}
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base/7 font-semibold text-gray-100">
                  <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-indigo-600">
                    {feature.icon}
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base/7 text-blue-100">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      {/* </div> */}
      </div>



    </div>
  )
}




