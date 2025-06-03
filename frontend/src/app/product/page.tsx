'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import apiMethodes from '@/lib/model/apimethods';
import { Product_API } from '@/lib/constant/customer-url';
import toast from 'react-hot-toast';

const validationSchema = Yup.object({
  name: Yup.string().required('Product name is required'),
  description: Yup.string().required('Description is required'),
  price: Yup.number().required('Price is required').min(0, 'Price must be at least 0'),
  stock: Yup.number().required('Stock is required').min(0, 'Stock must be at least 0'),
  file: Yup.string().required('Product image is required'),  // now string (base64)
});

export default function AddProductForm() {
  const productMutation = useMutation({
    mutationKey: ['add-product'],
    mutationFn: (data: any) => apiMethodes.post(Product_API.AddProduct, data),
    onSuccess: () => {
      toast.success('Product has been added successfully');
    },
    onError: () => {
      toast.error('Error while adding product');
    },
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      price: '',
      stock: '',
      file: '', // base64 string
    },
    validationSchema,
    onSubmit: (values) => {
      // Send values directly (no FormData)
      productMutation.mutate(values);
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        formik.setFieldValue('file', reader.result as string); // base64 string
      };
      reader.readAsDataURL(file);
    } else {
      formik.setFieldValue('file', '');
    }
  };

  return (
    <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto space-y-4 p-4 border rounded">
      <h2 className="text-xl font-bold">Add Product</h2>

      <div>
        <input
          type="file"
          name="file"
          onChange={handleFileChange}
          accept="image/*"
          className="w-full"
        />
        {formik.errors.file && formik.touched.file && (
          <div className="text-red-500 text-sm">{formik.errors.file}</div>
        )}
      </div>

      <div>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full border p-2"
        />
        {formik.errors.name && formik.touched.name && (
          <div className="text-red-500 text-sm">{formik.errors.name}</div>
        )}
      </div>

      <div>
        <textarea
          name="description"
          placeholder="Product Description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full border p-2"
        />
        {formik.errors.description && formik.touched.description && (
          <div className="text-red-500 text-sm">{formik.errors.description}</div>
        )}
      </div>

      <div>
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formik.values.price}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full border p-2"
        />
        {formik.errors.price && formik.touched.price && (
          <div className="text-red-500 text-sm">{formik.errors.price}</div>
        )}
      </div>

      <div>
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={formik.values.stock}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full border p-2"
        />
        {formik.errors.stock && formik.touched.stock && (
          <div className="text-red-500 text-sm">{formik.errors.stock}</div>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Add Product
      </button>
    </form>
  );
}
