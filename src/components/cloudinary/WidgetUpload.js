import React, { useEffect, useRef } from "react";

const WidgetUpload = () => {
  const cloudRef = useRef();
  const widgetRef = useRef();
  // const deleteImage = async (publicId) => {
  //   try {
  //     const response = await fetch(
  //       `https://api.cloudinary.com/v1_1/${
  //         cloudinaryCore.config().cloud_name
  //       }/image/destroy`,
  //       {
  //         method: "DELETE",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ public_id: publicId }),
  //       }
  //     );
  //     const data = await response.json();
  //     console.log(data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  useEffect(() => {
    cloudRef.current = window.cloudinary;
    widgetRef.current = cloudRef.current?.createUploadWidget(
      {
        cloudName: "dwkckmmr7",
        uploadPreset: "dfonqvzr",
      },
      (err, result) => {
        // get photoURL: result.info.files[0].uploadInfo.url
        console.log(
          "🚀 ~ file: AdminPage.js:16 ~ useEffect ~ result:",
          result.info.files[0].uploadInfo.url
        );
      }
    );
  }, []);
  return (
    <div>
      <button
        className="px-4 py-2 bg-blue-300 rounded"
        onClick={() => widgetRef.current?.open()}
      >
        Upload file
      </button>
    </div>
  );
};

export default WidgetUpload;
