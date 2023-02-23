import React from "react";
import styled from "styled-components";
const BookItemStyle = styled.div`
  .book-image {
    .overlay {
      transition: all 0.2s linear;
      opacity: 0;
      .content-overlay {
        transition: all 0.2s linear;
        cursor: pointer;
      }
      .content-overlay::after {
        content: "";
        transition: all 0.2s linear;
        width: 0;
        height: 1px;
        top: 102%;
        left: 0;
        position: absolute;
        background-color: white;
        position: absolute;
        background-color: white;
      }
      .content-overlay:hover {
        &::after {
          content: "";
          opacity: 1;
          width: 95%;
          height: 1px;
          top: 102%;
          left: 0;
        }
      }
    }
  }
  .book-image:hover {
    .overlay {
      opacity: 0.9;
    }
  }
`;
const BookItem = ({ title, classNameImage }) => {
  return (
    <BookItemStyle className="flex flex-col">
      <div className={`book-image relative w-full h-[350px] ${classNameImage}`}>
        <img
          src="https://source.unsplash.com/random"
          alt=""
          className="object-cover w-full h-full rounded"
        />
        <div className="absolute top-0 left-0 w-full h-full overlay bg-primary">
          <div className="block absolute text-xs text-white uppercase -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 tracking-[0.2rem] content-overlay font-medium">
            read more
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-1">
        <p className="text-lightGray text-xs mt-2 tracking-[0.2rem] uppercase">
          John Strass
        </p>
        <h2 className="text-xl font-medium font-cormorant">{title}</h2>
        <p className="mt-auto mb-3 text-xl font-cormorant">$38.00</p>
      </div>
    </BookItemStyle>
  );
};

export default BookItem;
