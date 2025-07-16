
// import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
const posts = [
  {
    id: 1,
    title: "Unified Workspace",
    href: "#",
    description:
      "Eliminate time wasted on disorganized communication and enhance team efficiency.",
    icons: <i className="fa-brands fa-space-awesome"></i>
  },
  {
    id: 2,
    title: "Simplified Collaboration",
    href: "#",
    description:
      "Enjoy smooth, consolidated communication channels, eliminating the need for multiple tools.",
    icons: <i className="fa-brands fa-squarespace"></i>
  },
  {
    id: 3,
    title: "Scalability and Flexibility",
    href: "#",
    description:
      "Whether you’re a small team or an enterprise, CollabFlow adapts to your needs and grows with you.",
      icons: <i className="fa-brands fa-cloudscale"></i>
  },
  {
    id: 4,
    title: "Enhanced Security",
    href: "#",
    description:
      "Your data is secured with industry-standard encryption and security protocols.",
    icons:<i className="fa-solid fa-shield"></i>
  },
];

export default function ThirdPage() {
  return (
    <section className="relative isolate overflow-hidden  px-6 py-24 sm:py-32 lg:px-8 ">
      <div className="absolute inset-0 -z-10" />
      <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg]  shadow-xl ring-1 shadow-indigo-600/10 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
      <div className="mx-auto max-w-2xl lg:max-w-4xl">
                  
        <h1 className="text-4xl text-center">Why Choose TC App?</h1>

        <figure className="mt-10">
          <blockquote className="text-center text-xl/8 font-semibold text-gray-100 sm:text-2xl/9">
            <p>
              “CollabFlow is revolutionizing the way teams collaborate,
              communicate, and achieve together. Say goodbye to scattered
              communications and disjointed workflow. Our feature-packed
              collaboration tool brings harmony & efficiency to your team’s
              work.”
            </p>
          </blockquote>

          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16  pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-2">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="flex max-w-xl flex-col items-start justify-between"
                >
                  
                  <div className="group relative grow">
                    
                    <h3 className="mt-3 text-lg/6 font-semibold text-gray-700 group-hover:text-gray-100">
                      
                      <span className="text-indigo-600">{post.icons} &nbsp;</span>
                      <a href={post.href}>
                        <span className="absolute inset-0" />
                        {post.title}
                      </a>
                    </h3>
                    <p className="mt-5 line-clamp-3 text-sm/6 text-gray-100">
                      {post.description}
                    </p>
                  </div>
                  
                </article>
              ))}
            </div>
          </div>
          {/* <figcaption className="mt-10">
            <Avatar className="mx-auto">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback></AvatarFallback>
            </Avatar>
            <div className="mt-4 flex items-center justify-center space-x-3 text-base">
              <div className="font-semibold text-indigo-650">Kunal</div>
              <svg
                width={3}
                height={3}
                viewBox="0 0 2 2"
                aria-hidden="true"
                className="fill-gray-100"
              >
                <circle r={1} cx={1} cy={1} />
              </svg>
              <div className="text-gray-300">Developer</div>
            </div>
          </figcaption> */}
        </figure>
      </div>
    </section>
  );
}
