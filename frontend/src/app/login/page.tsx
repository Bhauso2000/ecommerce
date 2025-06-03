'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import apiMethodes from '@/lib/model/apimethods';
import { AUTH_USER_API } from '@/lib/constant/customer-url';
import auth from '@/lib/model/auth';
import { LoginRequest, LoginResponse } from '@/lib/interfaces/user-interface';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
import Link from 'next/link';

export default function LoginForm() {
  const router = useRouter();
  const loginMutation = useMutation<LoginResponse, AxiosError, LoginRequest>({
    mutationKey: ['login-request'],
    mutationFn: (data) => apiMethodes.post(AUTH_USER_API.Login, data),
    onSuccess: (data) => {
      auth.setToken(data.token);
      toast.success('Login Successful');
      router.push('/');
    },
    onError: (error) => {
      toast.error(error.message || 'Invalid Credentials');
    },
  });

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(6, 'Minimum 6 characters').required('Required'),
    }),
    onSubmit: (values) => {
      loginMutation.mutate(values);
    },
  });

  return (
    <div className="max-w-md mx-auto mt-24 p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Welcome Back</h1>
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            {...formik.getFieldProps('email')}
            className={`w-full px-4 py-3 rounded-lg border ${
              formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'
            } text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="mt-1 text-sm text-red-600">{formik.errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="********"
            {...formik.getFieldProps('password')}
            className={`w-full px-4 py-3 rounded-lg border ${
              formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'
            } text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
          />
          {formik.touched.password && formik.errors.password && (
            <p className="mt-1 text-sm text-red-600">{formik.errors.password}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-3 rounded-lg shadow-md transition-transform active:scale-95"
        >
          Log In
        </button>
      </form>

      {/* Signup Link */}
      <p className="mt-6 text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <Link href="/signup" className="text-blue-600 hover:underline">
          Sign up
        </Link>
      </p>

      {/* React Hot Toast Container */}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}
