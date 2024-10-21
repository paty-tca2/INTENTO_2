"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ClipLoader from "react-spinners/ClipLoader";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import LoaderModal from "@/components/ui/loader_modal";
import MessageModal from '@/components/successmoda';

type FormData = {
  first_name: string;
  last_name: string;
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
};

export default function SignUp() {
  const { register, handleSubmit, watch, formState: { errors }, setError } = useForm<FormData>();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState<'success' | 'error'>('success');

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  const validatePassword = (password: string) => {
    const uppercasePattern = /[A-Z]/;
    const numberPattern = /[0-9]/;
    const specialCharacterPattern = /[^A-Za-z0-9]/;

    if (!uppercasePattern.test(password)) {
      return "La contraseña debe contener al menos una letra mayúscula";
    }
    if (!numberPattern.test(password)) {
      return "La contraseña debe contener al menos un número";
    }
    if (!specialCharacterPattern.test(password)) {
      return "La contraseña debe contener al menos un carácter especial";
    }
    return null;
  };

  const onSubmit = async (data: FormData) => {
    if (!isChecked) {
      setError("root.terms", {
        type: "manual",
        message: "Debes aceptar los términos y condiciones",
      });
      return;
    }

    if (data.email !== data.confirmEmail) {
      setError("confirmEmail", {
        type: "manual",
        message: "Los correos electrónicos no coinciden",
      });
      return;
    }

    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Las contraseñas no coinciden",
      });
      return;
    }

    const passwordError = validatePassword(data.password);
    if (passwordError) {
      setError("password", {
        type: "manual",
        message: passwordError,
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          first_name: data.first_name,
          last_name: data.last_name,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        // Send welcome email
        const emailResponse = await fetch('/api/send-welcome-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: data.email, firstName: data.first_name }),
        });
        
        const emailResult = await emailResponse.json();
        
        if (emailResult.success) {
          setModalMessage("Hemos enviado un correo de bienvenida a tu cuenta! Ya puedes ingresar!");
        } else {
          console.error('Error sending welcome email:', emailResult.error);
          setModalMessage("Tu cuenta ha sido creada, pero hubo un problema al enviar el correo de bienvenida. Por favor, revisa tu bandeja de entrada más tarde.");
        }
        
        setModalType('success');
      } else {
        if (result.message === "User already exists") {
          setModalMessage("Este correo electrónico ya está registrado. Por favor, intenta con otro o inicia sesión.");
        } else {
          setModalMessage(result.message || "Error al registrar usuario");
        }
        setModalType('error');
      }
    } catch (error) {
      console.error('Signup error:', error);
      setModalMessage("Error al conectar con el servidor");
      setModalType('error');
    } finally {
      setLoading(false);
      setIsModalOpen(true);
    }
  };

  return (
    <div className="relative flex flex-col min-h-screen justify-center items-center py-24 sm:py-32 mt-10">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <ClipLoader color="#04d9b2" loading={loading} size={50} />
        </div>
      )}

      <div className="absolute inset-0 z-0 w-full h-full overflow-hidden bg-black bg-opacity-65">
        <div className="absolute inset-0 w-full h-full mix-blend-overlay">
          <Image
            src="/fondo_singup.jpeg"
            alt="Descripción de la imagen"
            layout="fill"
            objectFit="cover"
            className={`w-full`}
          />
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-start justify-start sm:justify-center p-6 pt-1 min-h-screen sm:min-h-screen">
        <div className="pb-4">
          <div className="flex sm:flex-row items-center justify-center sm:justify-start space-x-4 sm:space-x-10 md:space-x-20 pb-6">
            <div className="text-left">
              <h1 className="text-[1.4rem] sm:text-[1.8rem] md:text-[2rem] font-geometos">
                <span style={{ color: "#ffffff" }}>¿Tienes </span>
                <span style={{ color: "#04d7af" }}>cuenta?</span>
              </h1>
            </div>
            <Link href="/auth/signin">
              <button
                className="bg-[#04d9b2] hover:bg-[#5D60a6] font-geometos rounded-full text-white w-[7rem] h-10 sm:w-80 text-[1rem] sm:text-[1.25rem]">INGRESA
              </button>
            </Link>
          </div>
          <h1 className="text-[1.6rem] sm:text-[1.8rem] md:text-[2rem] font-geometos">
            <span style={{ color: "#ffffff" }}>¿No tienes? </span>
            <span style={{ color: "#04d7af" }}>Regístrate ahora</span>
          </h1>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row justify-center">
          <div className="border border-white w-full px-6 py-8 max-w-lg">
            <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="block text-white text-[0.78rem] font-geometos pb-1" htmlFor="first_name">
                  NOMBRE
                </label>
                <input
                  className={`w-full p-1 text-black ${errors.first_name ? 'border border-red-500' : ''}`}
                  type="text"
                  id="first_name"
                  {...register("first_name", { required: "Nombre es requerido" })}
                />
                {errors.first_name && (
                  <p className="text-red-500 text-xs font-geometos">{errors.first_name.message}</p>
                )}
              </div>
              <div>
                <label className="block text-white text-[0.78rem] font-geometos pb-1" htmlFor="last_name">
                  APELLIDO
                </label>
                <input
                  className={`w-full p-1 text-black ${errors.last_name ? 'border border-red-500' : ''}`}
                  type="text"
                  id="last_name"
                  {...register("last_name", { required: "Apellido es requerido" })}
                />
                {errors.last_name && (
                  <p className="text-red-500 text-xs font-geometos">{errors.last_name.message}</p>
                )}
              </div>
              <div>
                <label className="block text-white text-[0.78rem] font-geometos pb-1" htmlFor="email">
                  INTRODUCE TU CORREO
                </label>
                <input
                  className={`w-full p-1 text-black ${errors.email ? 'border border-red-500' : ''}`}
                  type="email"
                  id="email"
                  {...register("email", { required: "Correo electrónico es requerido" })}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs font-geometos">{errors.email.message}</p>
                )}
              </div>
              <div>
                <label className="block text-white text-[0.78rem] font-geometos pb-1" htmlFor="confirmEmail">
                  CONFIRMA TU CORREO
                </label>
                <input
                  className={`w-full p-1 text-black ${errors.confirmEmail ? 'border border-red-500' : ''}`}
                  type="email"
                  id="confirmEmail"
                  {...register("confirmEmail", { required: "Confirmación de correo es requerida" })}
                />
                {errors.confirmEmail && (
                  <p className="text-red-500 text-xs font-geometos">{errors.confirmEmail.message}</p>
                )}
              </div>
              <div>
                <label className="block text-white text-[0.78rem] font-geometos pb-1" htmlFor="password">
                  CONTRASEÑA
                </label>
                <div className="relative">
                  <input
                    className={`w-full p-1 text-black placeholder:text-xs ${errors.password ? 'border border-red-500' : ''}`}
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Una mayúscula, un número y un carácter especial"
                    {...register("password", { required: "Contraseña es requerida" })}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeIcon className="h-5 w-5 text-gray-400" />
                    ) : (
                      <EyeOffIcon className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs font-geometos">{errors.password.message}</p>
                )}
              </div>
              <div>
                <label className="block text-white text-[0.78rem] font-geometos pb-1" htmlFor="confirmPassword">
                  CONFIRMA TU CONTRASEÑA
                </label>
                <div className="relative">
                  <input
                    className={`w-full p-1 text-black ${errors.confirmPassword ? 'border border-red-500' : ''}`}
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    {...register("confirmPassword", { required: "Confirmación de contraseña es requerida" })}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeIcon className="h-5 w-5 text-gray-400" />
                    ) : (
                      <EyeOffIcon className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs font-geometos">{errors.confirmPassword.message}</p>
                )}
              </div>

              <div className="mt-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                    className="mr-2"
                  />
                  <label
                    htmlFor="terms"
                    className="text-white text-xs font-geometos"
                  >
                    Acepto los{" "}
                    <a href="/terms" className="text-[#04d7af] underline">
                      terminos y condiciones
                    </a>{" "}
                    y el{" "}
                    <a
                      href="/privacy"
                      className="text-[#04d7af] underline"
                    >
                      Aviso de privacidad
                    </a>
                  </label>
                </div>
                {!isChecked && (
                  <p className="text-red-500 text-xs font-geometos mt-1">
                    Debes aceptar los términos y condiciones
                  </p>
                )}
              </div>

              <div className="my-3">
                <button
                  type="submit"
                  className="bg-[#04d9b2] hover:bg-[#5D60a6] font-geometos rounded-full text-white w-full h-10 flex justify-center items-center"
                >
                  {loading ? (
                    <ClipLoader color="#ffffff" loading={loading} size={20} />
                  ) : (
                    "CREAR CUENTA"
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className="border border-white w-full max-w-lg bg-white px-6 py-2">
            <div className="flex justify-center mb-4">
              <Image
                src="/logo-principal.png"
                alt="Descripción de la imagen"
                width={260}
                height={260}
                className="w-[260px] h-[260px] sm:w-[300px] sm:h-[300px] md:w-[300px] md:h-[300px]"
                layout="intrinsic"
              />
            </div>
            <h2 className="text-lg font-bold  text-[#5d60a6] font-geometos text-center">Beneficios</h2>
            <div className="flex flex-col text-[#5d60a6] space-y-4 text-[0.88rem] font-geometos">
              <div className="normal-case">
                <p className="pb-3">1) Recordatorios:</p>
                <p>Nunca vuelvas a olvidar una ocasion especial.</p>
              </div>
              <div>
                <p className="pb-3">2) Ahorra tiempo y dinero:</p>
                <p>Direcciones y metodos de pago seleccionados.</p>
              </div>
              <div>
                <p className="pb-3">3) Promociones:</p>
                <p>
                  Obten potenciales descuentos de temporada y por cliente
                  frecuente.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <LoaderModal loading={loading} />
      <MessageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message={modalMessage}
        type={modalType}
      />
    </div>
  );
}