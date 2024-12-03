import { create } from 'zustand'
import axiosInstance from '../lib/axios.js'

export const useAuthStore = create((set) => ({
    authUser: null,
    isInAuthProcess: false,

    isAuthencitated: () => Boolean(useAuthStore.getState().authUser),
    logout: () => set({ authUser: null }),
    checkAuth: async () => {
        try {
            set({ inProcess: true })
            const response = await axiosInstance.get('/auth/check-auth')
            set({ authUser: response.data })

        } catch (error) {// eslint-disable-line no-unused-vars
            set({ authUser: null })
        } finally {
            set({ inProcess: false })
        }
    },

}))