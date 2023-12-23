"use client"
import { useForm } from 'react-hook-form';

const RegisterForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
      // BACKEND
    };

    return (
        <form className='bg-gray-800 h-screen p-6' onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-4'>
                <label className='block text-gray-200 text-sm font-bold mb-2' htmlFor="name">Name</label>
                <input
                    {...register('name', { required: true })}
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    type="text"
                    id="name"
                    name="name"
                />
                {errors.name && <span className='text-red-500 text-xs italic'>This field is required</span>}
            </div>

            <div className='mb-4'>
                <label className='block text-gray-200 text-sm font-bold mb-2' htmlFor="email">Email</label>
                <input
                    {...register('email', { required: true })}
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    type="email"
                    id="email"
                    name="email"
                />
                {errors.email && <span className='text-red-500 text-xs italic'>This field is required</span>}
            </div>

            <button className='bg-orange-500 hover:bg-orange-600 text-gray-200 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type="submit">Register</button>
        </form>
    );
};

export default RegisterForm;
