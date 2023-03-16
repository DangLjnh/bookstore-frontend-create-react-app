import React from "react";
import { useController } from "react-hook-form";

const Texarea = ({ control, name }) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <textarea
      {...field}
      class="w-full h-[150px] p-3 text-gray-700 border-2 rounded"
      id="order_comments"
      placeholder="Notes about your order, e.g. special notes for delivery."
      rows="2"
      cols="5"
      spellcheck="false"
      data-gramm="false"
      wt-ignore-input="true"
      data-quillbot-element="uD26JHgmU8pxXlDOAhIf9"
    ></textarea>
  );
};

export default Texarea;
