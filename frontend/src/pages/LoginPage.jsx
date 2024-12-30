import { Link } from "react-router-dom"
import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'
import { useAuthStore } from "../store/authStore"

const SigninSchema = Yup.object().shape({
  password: Yup.string()
    .required('Required')
    .min(8, 'Too Short!')
    .max(30, 'Too Long!'),
  email: Yup.string().email('Invalid email').required('Required'),
})


export default function LoginPage() {
  const { login } = useAuthStore()

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 sm:px-0">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Login to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Formik
            initialValues={{
              password: '',
              email: '',
            }}
            validationSchema={SigninSchema}
            onSubmit={(values) => login(values)}
          >
            {({ errors, touched }) => (


              <Form action="#" method="POST" className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                    Email address
                  </label>
                  <div className="mt-2 relative">
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                    />
                    {touched.email && errors.email && <div className="absolute top-2.5 right-2 text-xs text-red-500">{errors.email}</div>}
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                    Password
                  </label>
                  <div className="mt-2 relative">
                    <Field
                      id="password"
                      name="password"
                      type="password"
                      required
                      autoComplete="current-password"
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                    />
                    {touched.password && errors.password && <div className="absolute top-2.5 right-2 text-xs text-red-500">{errors.password}</div>}
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign in
                  </button>
                </div>
              </Form>
            )}
          </Formik>
          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Dont have an account? {' '}
            <Link to={"/signup"} className="font-semibold text-indigo-600 hover:text-indigo-500">Sign up instead</Link>
          </p>
        </div>
      </div>
    </>
  )
}