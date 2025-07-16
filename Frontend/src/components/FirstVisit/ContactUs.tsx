import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
// import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

export default function ContactUs() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <a
        onClick={() => setOpen(true)}
        className="rounded-md bg-gray-100 px-2.5 py-1.5 text-sm font-semibold text-gray-900 hover:text-gray-100 hover:bg-indigo-900"
      >
        Support
      </a>
      <Dialog open={open} onClose={setOpen} className="relative z-100">
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
              <div className="isolate  px-3 py-24 sm:py-17 lg:px-8">
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                >
                  <div
                    style={{
                      clipPath:
                        "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                    }}
                    className="relative left-1/2 -z-10 aspect-1155/678 w-144.5 max-w-none -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-288.75"
                  />
                </div>
                <div className="mx-auto max-w-2xl text-center">
                  <h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-100 sm:text-5xl">
                    Contact Us
                  </h2>
                  <p className="mt-2 text-lg/8 text-gray-600">
                    Aute magna irure deserunt veniam aliqua magna enim
                    voluptate.
                  </p>
                </div>
                <form
                  action="#"
                  method="POST"
                  className="mx-auto mt-16 max-w-xl sm:mt-10"
                >
                  <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="first-name"
                        className="block text-sm/6 font-semibold text-gray-100"
                      >
                        First name
                      </label>
                      <div className="mt-2.5">
                        <input
                          id="first-name"
                          name="first-name"
                          type="text"
                          autoComplete="given-name"
                          className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-100 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="last-name"
                        className="block text-sm/6 font-semibold text-gray-100"
                      >
                        Last name
                      </label>
                      <div className="mt-2.5">
                        <input
                          id="last-name"
                          name="last-name"
                          type="text"
                          autoComplete="family-name"
                          className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-100 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                        />
                      </div>
                    </div>
                   
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="email"
                        className="block text-sm/6 font-semibold text-gray-100"
                      >
                        Email
                      </label>
                      <div className="mt-2.5">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-100 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                        />
                      </div>
                    </div>
                   
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="message"
                        className="block text-sm/6 font-semibold text-gray-100"
                      >
                        Message
                      </label>
                      <div className="mt-2.5">
                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-100 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                          defaultValue={""}
                        />
                      </div>
                    </div>
                    <div className="flex gap-x-4 sm:col-span-2">
                      <div className="flex h-6 items-center">
                        <div className="group relative inline-flex w-8 shrink-0 rounded-full bg-gray-200 p-px inset-ring inset-ring-gray-900/5 outline-offset-2 outline-indigo-600 transition-colors duration-200 ease-in-out has-checked:bg-indigo-600 has-focus-visible:outline-2">
                          <span className="size-4 rounded-full bg-white shadow-xs ring-1 ring-gray-900/5 transition-transform duration-200 ease-in-out group-has-checked:translate-x-3.5" />
                          <input
                            id="agree-to-policies"
                            name="agree-to-policies"
                            type="checkbox"
                            aria-label="Agree to policies"
                            className="absolute inset-0 appearance-none focus:outline-hidden"
                          />
                        </div>
                      </div>
                      <label
                        htmlFor="agree-to-policies"
                        className="text-sm/6 text-gray-600"
                      >
                        By selecting this, you agree to our{" "}
                        <a
                          href="#"
                          className="font-semibold whitespace-nowrap text-indigo-600"
                        >
                          privacy policy
                        </a>
                        .
                      </label>
                    </div>
                  </div>
                  <div className="mt-10">
                    <button
                      type="submit"
                      className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Let's talk
                    </button>
                  </div>
                </form>
              </div>

              <div className=" px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  data-autofocus
                  onClick={() => setOpen(false)}
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
