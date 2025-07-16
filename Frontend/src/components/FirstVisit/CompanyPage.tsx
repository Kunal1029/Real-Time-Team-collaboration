import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";

export default function CompanyPage() {
  const [about, setAbout] = useState(false);
  return (
    <div>
      <a
        onClick={() => setAbout(true)}
        className="rounded-md bg-gray-100 px-2.5 py-1.5 text-sm font-semibold text-gray-900 hover:text-gray-100 hover:bg-indigo-900"
      >
        Company
      </a>
      <Dialog open={about} onClose={setAbout} className="relative z-100">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-100/20 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-10">
            <DialogPanel
              transition
              className="relative w-[80%] h-[80%] bg-black transform overflow-hidden rounded-lg text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
            >
              <div className="relative isolate overflow-hidden  px-6 py-24 sm:py-20 lg:overflow-visible lg:px-0">
                <div className="absolute inset-0 -z-10 overflow-hidden">
                  <svg
                    aria-hidden="true"
                    className="absolute top-0 left-[max(50%,25rem)] h-256 w-512 -translate-x-1/2 mask-[radial-gradient(64rem_64rem_at_top,white,transparent)] stroke-gray-200"
                  >
                    <defs>
                      <pattern
                        x="50%"
                        y={-1}
                        id="e813992c-7d03-4cc4-a2bd-151760b470a0"
                        width={200}
                        height={200}
                        patternUnits="userSpaceOnUse"
                      >
                        <path d="M100 200V.5M.5 .5H200" fill="none" />
                      </pattern>
                    </defs>
                    <svg
                      x="50%"
                      y={-1}
                      className="overflow-visible fill-gray-850"
                    >
                      <path
                        d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
                        strokeWidth={0}
                      />
                    </svg>
                    <rect
                      fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)"
                      width="100%"
                      height="100%"
                      strokeWidth={0}
                    />
                  </svg>
                </div>
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
                  <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                    <div className="lg:pr-4">
                      <div className="lg:max-w-lg">
                        <p className="text-base/7 font-semibold text-indigo-600">
                          About Us
                        </p>
                        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-100 sm:text-5xl">
                          A better workflow
                        </h1>
                        <p className="mt-6 text-xl/8 text-gray-700">
                          Aliquet nec orci mattis amet quisque ullamcorper
                          neque, nibh sem. At arcu, sit dui mi, nibh dui, diam
                          eget aliquam. Quisque id at vitae feugiat egestas.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="-mt-12 -ml-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
                    <img
                      alt=""
                    //   src="https://tailwindcss.com/plus-assets/img/component-images/dark-project-app-screenshot.png"
                    src="/about.jpg"
                      className="w-3xl max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-228"
                    />
                  </div>
                  <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                    <div className="lg:pr-4">
                      <div className="max-w-xl text-base/7 text-gray-600 lg:max-w-lg">
                        <p>
                          Faucibus commodo massa rhoncus, volutpat. Dignissim
                          sed eget risus enim. Mattis mauris semper sed amet
                          vitae sed turpis id. Id dolor praesent donec est. Odio
                          penatibus risus viverra tellus varius sit neque erat
                          velit. Faucibus commodo massa rhoncus, volutpat.
                          Dignissim sed eget risus enim. Mattis mauris semper
                          sed amet vitae sed turpis id.
                        </p>
                        <ul
                          role="list"
                          className="mt-8 space-y-8 text-gray-600"
                        >
                          <li className="flex gap-x-3">
                            {/* <CloudArrowUpIcon aria-hidden="true" className="mt-1 size-5 flex-none text-indigo-600" /> */}
                            <span>
                              <strong className="font-semibold text-gray-100">
                                Push to deploy.
                              </strong>{" "}
                              Lorem ipsum, dolor sit amet consectetur
                              adipisicing elit. Maiores impedit perferendis
                              suscipit eaque, iste dolor cupiditate blanditiis
                              ratione.
                            </span>
                          </li>
                          <li className="flex gap-x-3">
                            {/* <LockClosedIcon aria-hidden="true" className="mt-1 size-5 flex-none text-indigo-600" /> */}
                            <span>
                              <strong className="font-semibold text-gray-100">
                                SSL certificates.
                              </strong>{" "}
                              Anim aute id magna aliqua ad ad non deserunt sunt.
                              Qui irure qui lorem cupidatat commodo.
                            </span>
                          </li>
                          
                        </ul>
                        
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className=" px-4 py-1 mb-5 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  data-autofocus
                  onClick={() => setAbout(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md  px-3 py-2 text-sm font-semibold text-gray-100 shadow-xs ring-1 ring-gray-300 ring-inset hover:text-gray-900 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
