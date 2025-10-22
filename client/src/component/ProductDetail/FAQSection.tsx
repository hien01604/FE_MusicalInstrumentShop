import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Can I pre-order products that are not yet available?",
    a: (
      <>
        <p className="mb-2">
          Yes! Other than custom orders, all pre-orders/reservations require a
          100% deposit of the total product value, or a 30% deposit and the
          remaining 70% payment upon arrival.
        </p>
        <a
          href="#"
          className="text-blue-600 hover:underline font-medium"
        >
          Please contact our friendly Customer Service Team
        </a>{" "}
        to reserve your product today!
      </>
    ),
  },
  {
    q: "Is my order guaranteed?",
    a: "Orders are confirmed and guaranteed after payment has been received and verified.",
  },
  {
    q: "Can I check the product before buying?",
    a: "Yes, customers are welcome to visit our store to inspect and test the product before purchase.",
  },
  {
    q: "Does my order come with accessories?",
    a: "Depending on the product, accessories such as straps or cases may be included.",
  },
  {
    q: "Does the guitar/bass have a set up?",
    a: "All instruments are tuned and inspected before shipping to ensure the best playing condition.",
  },
];

const FAQSection: React.FC = () => {
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set());

  const toggleFAQ = (index: number) => {
    setOpenIndices((prev) => {
      const newOpenIndices = new Set(prev);
      if (newOpenIndices.has(index)) {
        newOpenIndices.delete(index); // Close the tab if it's already open
      } else {
        newOpenIndices.add(index); // Open the tab if it's closed
      }
      return newOpenIndices;
    });
  };

  return (
    <section className="max-w-6xl mx-auto mt-12">
      <div className="flex flex-col gap-2">
        {faqs.map((item, index) => (
          <div
            key={index}
            className="bg-[#F7F6F3] border border-gray-200 rounded-sm overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center px-5 py-4 text-left"
            >
              <span
                className={`font-semibold text-[15px] ${
                  openIndices.has(index) ? "text-black" : "text-gray-800"
                }`}
              >
                {item.q}
              </span>
              <ChevronDown
                size={20}
                className={`text-gray-600 transition-transform ${
                  openIndices.has(index) ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Nội dung mở */}
            <div
              className={`overflow-hidden transition-all duration-300 ${
                openIndices.has(index) ? "max-h-96 py-2 px-5" : "max-h-0"
              }`}
            >
              <div className="text-gray-700 text-sm leading-relaxed">
                {item.a}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
