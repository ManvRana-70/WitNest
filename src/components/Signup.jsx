import React, { useState } from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { login } from '../store/authSlice'
import { Button, Input, Logo } from './index'
import { useDispatch } from 'react-redux'

function Signup() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error, setError] = useState("")
    const { register, handleSubmit, watch } = useForm()
    const password = watch("password");

    const create = async (data) => {
        setError("")
        try {
            const session = await authService.createAccount(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(login(userData))
                navigate("/")
            }
        } catch (error) {
            setError(error)
        }
    }
    return (
        <div className='flex items-center justify-center w-full py-4'>
            <div className={`mx-auto w-full max-w-lg bg-[#fef2d6] rounded-xl p-10 border border-black/10`}>
                <div className='mb-2 flex justify-center'>
                    <span className='inline-block w-full justify-items-center'>
                        <Logo side='100px' />
                    </span>
                </div>
                <h2 className='text-center text-2xl font-bold leading-tight'>Sign up for your Account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Login
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(create)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address"
                                }
                            })}
                        />

                        <Input
                            label="Password: "
                            placeholder="Enter password"
                            type="password"
                            {...register("password", {
                                required: true
                            })}
                        />

                        <Input
                            label="Confirm Password "
                            placeholder="Confirm your password"
                            type="password"
                            {...register("confirm_password", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => value == password ||
                                        "Password donot match!!"
                                }
                            })}
                        />

                        <Button
                            type="submit"
                            bgColor='bg-black'
                            className="w-full hover:bg-gray-800 active:bg-gray-900"
                        >Sign Up</Button>

                    </div>
                </form>

            </div>
        </div>
    )
}

export default Signup