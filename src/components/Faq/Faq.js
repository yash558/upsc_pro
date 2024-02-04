"use client";

import React, { useState } from "react";
import FaqQuestion from "./FaqQuestion";
const Faq = () => {
  const [open, setOpened] = useState(false);

  const toggle = (index) => {
    if (open === index) {
      return setOpened(null);
    }

    setOpened(index);
  };

  const data = [
    {
      question: "What is A4Medicine?",
      answer:
        "A4Medicine is a comprehensive online platform dedicated to supporting healthcare professionals in their medical education and practice. It offers a wide range of resources, including charts, webinars, MCQs, and evidence-based reviews, to enhance learning and facilitate optimal patient care.",
    },
    {
      question: "Who is A4Medicine for?",
      answer:
        "A4Medicine is designed for a diverse audience of healthcare professionals, including doctors, nurses, pharmacists, physician assistants, and paramedics. It caters to anyone providing patient care outside of the hospital environment and aims to support their educational needs.",
    },
   
    {
      question: "Is A4Medicine a trusted source of information?",
      answer:
        "Yes, A4Medicine is committed to providing reliable and evidence-based information. The resources available on the platform are thoroughly researched, fully referenced, and sourced from reputable national and international organizations such as NICE, NCBI, BMJ, and BJGP.",
    },
    {
      question: "Is A4Medicine a trusted source of information?",
      answer:
        "Yes, A4Medicine is committed to providing reliable and evidence-based information. The resources available on the platform are thoroughly researched, fully referenced, and sourced from reputable national and international organizations such as NICE, NCBI, BMJ, and BJGP.",
    },
    {
      question: "Is A4Medicine a trusted source of information?",
      answer:
        "Yes, A4Medicine is committed to providing reliable and evidence-based information. The resources available on the platform are thoroughly researched, fully referenced, and sourced from reputable national and international organizations such as NICE, NCBI, BMJ, and BJGP.",
    },
    {
      question: "Is A4Medicine a trusted source of information?",
      answer:
        "Yes, A4Medicine is committed to providing reliable and evidence-based information. The resources available on the platform are thoroughly researched, fully referenced, and sourced from reputable national and international organizations such as NICE, NCBI, BMJ, and BJGP.",
    },
    {
      question: "Is A4Medicine a trusted source of information?",
      answer:
        "Yes, A4Medicine is committed to providing reliable and evidence-based information. The resources available on the platform are thoroughly researched, fully referenced, and sourced from reputable national and international organizations such as NICE, NCBI, BMJ, and BJGP.",
    },
   
    {
      question: "Is A4Medicine a trusted source of information?",
      answer:
        "Yes, A4Medicine is committed to providing reliable and evidence-based information. The resources available on the platform are thoroughly researched, fully referenced, and sourced from reputable national and international organizations such as NICE, NCBI, BMJ, and BJGP.",
    },
   

   
   
    {
      question: "Is my data safe on A4Medicine's website?",
      answer:
        "Yes, at A4Medicine, we prioritize the security and privacy of your data. We are committed to protecting your personal information and adhere to the Information Commissioner's Office (ICO) regulations in the UK. We are also compliant with the General Data Protection Regulation (GDPR), which sets strict standards for data protection and privacy. For more detailed information on how we handle and protect your data, please refer to our privacy policy, where you can find comprehensive details about our data practices and your rights as a user.",
    },
    {
        question: "Is A4Medicine a trusted source of information?",
        answer: "Yes, A4Medicine is committed to providing reliable and evidence-based information. The resources available on the platform are thoroughly researched, fully referenced, and sourced from reputable national and international organizations such as NICE, NCBI, BMJ, and BJGP.",
    },
  ];

  return (
    <div className="bg-Teal">
      <div className="section">
        <h3 className="mb-12 text-3xl text-center leading-0 font-extrabold tracking-light text-white sm:text-[2.5rem] sm:leading-10">
          Frequently Asked Question
        </h3>
        <hr className="border-0 border-gray-100" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.map((item, index) => {
            return (
              <FaqQuestion
                key={index}
                open={index === open}
                title={item.question}
                desc={item.answer}
                toggle={() => toggle(index)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Faq;
