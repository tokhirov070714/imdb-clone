
import { useUser } from "@/providers/UserProvider";
import { useTheme } from "@/providers/ThemeProvider";

const Profile: React.FC = () => {

    const { user } = useUser()
    const { theme } = useTheme()

    return (

        <div className="flex flex-col items-center justify-center px-4">

            <div className={`${theme == "dark" ? "bg-neutral-900 text-neutral-100"
                : "bg-neutral-200 text-neutral-900"

                } dark:bg-neutral-800 dark:text-neutral-50 p-8 rounded-2xl shadow-lg w-full max-w-md border border-neutral-700`}>

                <h1 className="text-3xl font-bold mb-4 text-center">Profile</h1>

                <div className="space-y-4">

                    <div className="flex justify-between border-b border-neutral-700 pb-2">

                        <span className="font-semibold">Username:</span>

                        <span className={

                            theme == "dark" ? "text-neutral-300" : "text-neutral-800"

                        }>{user.username}</span>

                    </div>

                    <div className="flex justify-between mt-8 border-b border-neutral-700 pb-2">

                        <span className="font-semibold">User ID:</span>

                        <span className={

                            theme == "dark" ? "text-neutral-300" : "text-neutral-800"

                        }>{user.id}</span>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default Profile