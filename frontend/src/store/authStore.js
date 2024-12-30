import { create } from 'zustand'
import axiosInstance from '../lib/axios.js'
import { toast } from 'react-toastify'

export const useAuthStore = create((set) => ({
    //initial values
    authUser: null,
    isInAuthProcess: false,
    //setters
    logout: async () => {
        try {
            const response = await axiosInstance.get('/auth/logout') //logout from server
            set({ authUser: null })
            console.log(response.status, '- User logged out')
            toast.success("User logged out")
        } catch (error) {
            console.log(error.response.status, error.response.data)
            toast.error('error logging out')
        }
    },

    signup: async (userData) => {
        try {
            set({ isInAuthProcess: true })
            const response = await axiosInstance.post('/auth/signup', userData)
            set({ authUser: response.data })
            console.log(`${response.status} - Account created successfully`)
            toast.success("Account created successfully")

        } catch (error) {// eslint-disable-line no-unused-vars
            console.log(error.response.status, error.response.data)
            toast.error(error.response.data)

        } finally {
            set({ isInAuthProcess: false })
        }

    },

    login: async (formData) => {
        try {
            set({ isInAuthProcess: true })
            const response = await axiosInstance.post('/auth/login', formData) //generate jwt token if authenticated
            if (response.status === 200) {
                console.log(response.status, '- User is logged in')
                toast.success("User is logged in")
                set({ authUser: response.data })
            }
        } catch (error) {
            console.log(error.response.status, error.response.data)
            toast.error("error logging in")
        } finally {
            set({ isInAuthProcess: false })
        }
    },

    checkAuth: async () => {
        console.log('checking auth')
        try {
            set({ inProcess: true })
            const response = await axiosInstance.get('/auth/check-auth')

            if (response.status === 200) {
                set({ authUser: response.data })
                console.log('token is valid')
            }

        } catch (error) {
            set({ authUser: null })
            console.log(error.response.status, error.response.data)
        } finally {
            set({ inProcess: false })
        }
    },

    updateProfile: async (data) => {
        try {

            const response = await axiosInstance.put('/auth/update-profile', data)
            if (response.status === 200) {
                set({ authUser: response.data })
                toast.success("Profile picture updated")
                console.log(response.status, 'image updated')
            }
        } catch (error) {
            toast.error("error updating profile picture")
            console.log(error.response.status, error.response.data)
        }
    },


}))


