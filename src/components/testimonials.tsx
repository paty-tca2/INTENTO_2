"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo expedita voluptas culpa sapiente alias molestiae. Numquam corrupti in laborum sed rerum et corporis.",
    name: "Judith Black",
    title: "Cliente",
    image: "/icono-footer.png"
  },
  {
    id: 2,
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo expedita voluptas culpa sapiente alias molestiae. Numquam corrupti in laborum sed rerum et corporis.",
    name: "Jane Doe",
    title: "Cliente",
    image: "/icono-footer.png"
  },
];

export default function TestimonialsComponent() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const testimonial = testimonials[currentTestimonial];

  return (
    <section className="relative isolate overflow-hidden bg-white px-4 py-12 sm:px-6 sm:py-16 md:py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-md sm:max-w-3xl lg:max-w-6xl">
        <div className="relative">
          <button 
            onClick={prevTestimonial} 
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#04d9b2] bg-opacity-50 p-2 rounded-full shadow-md hover:bg-opacity-75 transition-all z-10"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} className="text-white" />
          </button>
          <button 
            onClick={nextTestimonial} 
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#04d9b2] bg-opacity-50 p-2 rounded-full shadow-md hover:bg-opacity-75 transition-all z-10"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} className="text-white" />
          </button>
          <figure className="mt-10">
            <div className="mx-auto h-20 w-20 sm:h-24 sm:w-24 lg:h-32 lg:w-32 relative mb-4">
              <Image
                src={testimonial.image}
                alt={`${testimonial.name}'s profile picture`}
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-full"
              />
            </div>
            <div className="mt-4 flex items-center justify-center space-x-3 text-base mb-4">
              <div className="font-geometos font-semibold text-[#04d9b2] text-lg sm:text-xl lg:text-xl">{testimonial.name}</div>
              <svg width={3} height={3} viewBox="0 0 2 2" aria-hidden="true" className="fill-gray-900">
                <circle r={1} cx={1} cy={1} />
              </svg>
              <div className="font-geometos text-black text-lg sm:text-xl lg:text-xl">{testimonial.title}</div>
            </div>
            <blockquote className="text-center text-xl font-geometos leading-8 text-gray-900 sm:text-2xl sm:leading-9 lg:text-2xl lg:leading-10 px-4 sm:px-8 lg:px-16">
              <p>&ldquo;{testimonial.content}&rdquo;</p>
            </blockquote>
          </figure>
        </div>
      </div>
    </section>
  );
}