'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AxiosError } from 'axios';

import apiMethodes from '@/lib/model/apimethods';
import { AUTH_USER_API } from '@/lib/constant/customer-url';
import { LoginResponse, SignUpRequest } from '@/lib/interfaces/user-interface';
import auth from '@/lib/model/auth';

export default function SignupForm() {
  const router = useRouter();

  const signupMutation = useMutation<LoginResponse, AxiosError,SignUpRequest >({
    mutationKey: ['signup-request'],
    mutationFn:  (data) => 
        apiMethodes.post(AUTH_USER_API.Singup, data),
       
    onSuccess: (data) => {
      auth.setToken(data.token);
      toast.success('Account created successfully');
      router.push('/');
    },
    onError: (error) => {
      toast.error(error?.message || 'Registration failed');
    },
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().min(2, 'Too short').max(50, 'Too long').required('Required'),
      email: Yup.string().email('Invalid email').required('Required'),
      password: Yup.string().min(6, 'Minimum 6 characters').max(100).required('Required'),
    }),
    onSubmit: (values) => {
      signupMutation.mutate(values);
    },
  });

  return (
    <div className="max-w-md mx-auto mt-24 p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Create Account</h1>
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="John Doe"
            {...formik.getFieldProps('name')}
            className={`w-full px-4 py-3 rounded-lg border ${
              formik.touched.name && formik.errors.name ? 'border-red-500' : 'border-gray-300'
            } text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
          />
          {formik.touched.name && formik.errors.name && (
            <p className="mt-1 text-sm text-red-600">{formik.errors.name}</p>
          )}
        </div>

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

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-3 rounded-lg shadow-md transition-transform active:scale-95"
        >
          Sign Up
        </button>
      </form>

      {/* Login Link */}
      <p className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link href="/login" className="text-blue-600 hover:underline">
          Log in
        </Link>
      </p>

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}
