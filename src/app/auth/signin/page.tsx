"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import LoaderModal from "@/components/ui/loader_modal";
import { signIn } from "next-auth/react";

export default function SignIn() {
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState({
        identifier: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [validationErrors, setValidationErrors] = useState({
        identifier: false,
        password: false,
    });
    const [loginError, setLoginError] = useState("");
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData({
            ...userData,
            [e.target.id]: e.target.value,
        });
        setValidationErrors({
            ...validationErrors,
            [e.target.id]: false,
        });
        setLoginError("");
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setLoginError("");

        try {
            console.log("Attempting to sign in with:", userData.identifier);
            const result = await signIn('credentials', {
                identifier: userData.identifier,
                password: userData.password,
                redirect: false,
            });

            console.log("SignIn result:", result);

            if (result?.error) {
                console.error("SignIn error:", result.error);
                if (result.error === "CredentialsSignin") {
                    setLoginError("Correo electrónico o contraseña incorrectos");
                } else {
                    setLoginError("Error al iniciar sesión. Por favor, intenta de nuevo.");
                }
            } else if (result?.ok) {
                console.log("SignIn successful, redirecting...");
                router.push('/my-account');
            } else {
                console.error("Unexpected SignIn result:", result);
                setLoginError("Ocurrió un error inesperado");
            }
        } catch (error) {
            console.error("Sign in error:", error);
            setLoginError("Ocurrió un error durante el inicio de sesión");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex flex-col min-h-screen justify-center items-center">
            <div className="absolute inset-0 z-0 w-full h-full overflow-hidden bg-black bg-opacity-65">
                <div className="absolute inset-0 w-full h-full mix-blend-overlay">
                    <Image
                        src="/fondo_singup.jpeg"
                        alt="Descripción de la imagen"
                        layout="fill"
                        objectFit="cover"
                        priority
                    />
                </div>
            </div>

            <div className="relative z-10 flex flex-col items-start justify-start p-6 py-16 sm:py-32 min-h-screen"> {/* Updated padding */}
                <div className="pb-4 mb-8 sm:mb-0"> {/* Added margin-bottom */}
                    <h1 className="text-[1.6rem] sm:text-[1.8rem] md:text-[2.7rem] font-geometos">
                        <span style={{ color: "#ffffff" }}>INGRESA</span>
                    </h1>
                </div>

                <div className="w-full max-w-md">
                    <form className="flex flex-col mt-4 space-y-4 sm:mx-auto sm:max-w-md" onSubmit={handleSubmit}>
                        <div className="w-full">
                            <label className="block text-white text-[0.78rem] font-geometos pb-1" htmlFor="identifier">
                                CORREO ELECTRONICO
                            </label>
                            <input
                                className={`w-full p-1 text-black ${validationErrors.identifier ? 'border border-red-500' : ''}`}
                                type="email"
                                id="identifier"
                                value={userData.identifier}
                                onChange={handleChange}
                            />
                            {validationErrors.identifier && (
                                <p className="text-red-500 text-xs font-geometos">Correo electrónico es requerido</p>
                            )}
                        </div>
                        <div className="w-full">
                            <label className="block text-white text-[0.78rem] font-geometos pb-1" htmlFor="password">
                                CONTRASEÑA
                            </label>
                            <div className="relative">
                                <input
                                    className={`w-full p-1 text-black placeholder:text-xs ${validationErrors.password ? 'border border-red-500' : ''}`}
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    value={userData.password}
                                    onChange={handleChange}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <FaEyeSlash className="text-gray-500" />
                                    ) : (
                                        <FaEye className="text-gray-500" />
                                    )}
                                </button>
                            </div>
                            {validationErrors.password && (
                                <p className="text-red-500 text-xs font-geometos">Contraseña es requerida</p>
                            )}
                        </div>

                        {loginError && (
                            <p className="text-red-500 text-xs font-geometos">{loginError}</p>
                        )}

                        <div className="w-full text-left">
                            <a href="/privacy" className="text-xs font-geometos text-[#04d7af] underline">
                                ¿Olvidaste tu contraseña?
                            </a>
                        </div>

                        <div className="w-full">
                            <button type="submit" className="bg-[#04d9b2] hover:bg-[#5D60a6] font-geometos rounded-full text-white w-full py-2 text-[1rem]">
                                ENTRAR
                            </button>
                        </div>
                    </form>
                </div>

                {/* Separated "¿No tienes cuenta?" section */}
                <div className="w-full max-w-md mt-12 sm:mt-16">
                    <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between space-y-4 sm:space-y-0 sm:space-x-4">
                        <h1 className="text-[1.2rem] sm:text-[1.4rem] md:text-[1.6rem] font-geometos">
                            <span style={{ color: "#ffffff" }}>¿No tienes </span><span style={{ color: "#04d7af" }}>cuenta?</span>
                        </h1>
                        <Link href="/auth/sign-up">
                            <button className="bg-[#04d9b2] hover:bg-[#5D60a6] font-geometos rounded-full text-white px-5 py-2 text-[0.9rem] sm:text-[1rem]">
                                REGISTRATE
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            <LoaderModal loading={loading} />
            {/* Remove the ToastContainer */}
        </div>
    );
}
