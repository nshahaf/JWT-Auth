import { useState } from "react"
import { useAuthStore } from "../store/authStore"

export default function ProfilePage() {
    const { authUser, updateProfile } = useAuthStore()
    const name = authUser ? authUser.fullName : 'John Doe'
    const email = authUser ? authUser.email : 'JohnDoe@email.com'
    const profilePic = authUser.profilePic ? authUser.profilePic : "/userAvatar.png"
    const [selectedImage, setSelectedImage] = useState(null);


    const handleFileUpload = async (e) => {
        const file = e.target.files[0]
        if (!file) return

        const reader = new FileReader()

        reader.readAsDataURL(file)

        reader.onload = async () => {
            const base64Image = reader.result
            setSelectedImage(base64Image)
            await updateProfile({ profilePicture: base64Image })
        }
    }

    return (
        <div className="page ">
            <div className="w-full mx-auto max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mt-3 sm:mt-20">
                <div className="flex justify-end px-4">

                </div>
                <div className="flex flex-col items-center py-10">
                    <img className="w-24 h-24 mb-3 rounded-full shadow-lg place-content-center text-center object-cover" src={selectedImage || profilePic} alt="profile image" />
                    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{name}</h5>
                </div>
                <form className="space-y-6  pb-10 px-10">
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                        <input type="text" value={name} aria-label="disabled input" className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" disabled readOnly />
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input type="text" value={email} aria-label="disabled input" className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" disabled readOnly />
                    </div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="user_avatar">Upload image</label>
                    <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" onChange={handleFileUpload} aria-describedby="user_avatar_help" type="file" accept=".png, .svg, .jpg" />
                </form >
            </div>


        </div>



    )
}
